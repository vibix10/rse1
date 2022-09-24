const Order = require("../models/orderModel");
const Investor = require("../models/investorModel");
const Company = require("../models/companyModel");
const ExecutedOrder = require("../models/executedOrder");
const ErrorHandler = require("../utils/errorClass");
const asyncHandler = require("../middleware/async");
const ApiFeatures = require("../utils/apiFeatures");

// create order => /api/order/selling/create/:companyid
exports.createSellingOrder = asyncHandler(async (req, res, next) => {
  const { bid, volume } = req.body;
  const investor1 = await Investor.findById(req.investor.id);
  const company1 = await Company.findById(req.params.companyid);
  const totalCost = bid * volume;

  const companyObject = investor1.shares.find(
    (element) => element.companyName === company1.name
  );

  if (!companyObject) {
    return next(
      new ErrorHandler(`you do not own shares in ${company1.name}`, 404)
    );
  }
  const isSufficient = companyObject.num >= volume;
  if (!isSufficient) {
    return next(
      new ErrorHandler(`you do not own enough shares in ${company1.name}`, 404)
    );
  }

  var filtered = investor1.shares.filter(function (value, index, arr) {
    return !Object.is(JSON.stringify(value), JSON.stringify(companyObject));
  });
  var newNum = Number(companyObject.num) - Number(volume);
  var newShare = {
    ...companyObject,
    num: newNum,
  };
  investor1.shares = [...filtered, newShare];
  await investor1.save();
  const order = await Order.create({
    company: company1.id,
    investor: investor1.id,
    status: "outstanding",
    bid,
    volume,
    totalCost,
    orderType: "selling",
  });
  if (!order) {
    return next(new ErrorHandler(`failed to create order`, 404));
  }
  // response
  res.status(200).json({
    success: true,
    order,
  });
});

// create order => /api/order/buying/create/:companyid
exports.createBuyingOrder = asyncHandler(async (req, res, next) => {
  const { bid, volume } = req.body;
  const investor1 = await Investor.findById(req.investor.id);
  const company1 = await Company.findById(req.params.companyid);
  const totalCost = bid * volume;

  const isSufficient = investor1.cashBalance >= totalCost;
  if (!isSufficient) {
    return next(new ErrorHandler(`you do not have enough funds`, 404));
  }
  investor1.cashBalance = investor1.cashBalance - totalCost;
  await investor1.save();
  const order = await Order.create({
    company: company1._id,
    investor: investor1._id,
    status: "outstanding",
    bid,
    volume,
    totalCost,
    orderType: "buying",
  });
  if (!order) {
    return next(new ErrorHandler(`failed to create order`, 404));
  }
  // response
  res.status(200).json({
    succes: true,
    order,
  });
});

// place IPO order => /api/order/ipo/create/:companyid
exports.createIpoOrder = asyncHandler(async (req, res, next) => {
  const { bid, volume } = req.body;
  const investor1 = await Investor.findById(req.investor.id);
  const company1 = await Company.findById(req.params.companyid);
  const totalCost = bid * volume;

  // check investor
  const isSufficient = investor1.cashBalance >= totalCost;
  if (!isSufficient) {
    return next(new ErrorHandler(`you do not have enough funds`, 404));
  }
  investor1.cashBalance = investor1.cashBalance - totalCost;
  await investor1.save();

  // check company
  const isAvailable = company1.outstanding >= volume;
  //console.log(company1.outstandingBalance);
  if (!isAvailable) {
    return next(new ErrorHandler(`not enough ipo shares, reduce volume`, 404));
  }

  // create IPO order
  const order = await Order.create({
    company: company1._id,
    investor: investor1._id,
    status: "executed",
    bid,
    volume,
    totalCost,
    orderType: "ipoOrder",
  });
  if (!order) {
    return next(new ErrorHandler(`failed to create order`, 404));
  }
  // execute order

  // TopUp company account and reduce outstanding shares
  company1.cashBalance = company1.cashBalance + totalCost;
  company1.outstanding = company1.outstanding - volume;
  await company1.save();

  // Create share for underwriter
  const companyObject = investor1.shares.find(
    (element) => element.companyName === company1.name
  );
  //console.log(companyObject);
  if (!companyObject) {
    var newShare = {
      companyRef: company1.id,
      companyName: company1.name,
      num: volume,
    };
    investor1.shares = [...investor1.shares, newShare];
  } else {
    var filtered = investor1.shares.filter(function (value, index, arr) {
      return !Object.is(JSON.stringify(value), JSON.stringify(companyObject));
    });
    var newNum = Number(companyObject.num) + Number(volume);
    newShare = {
      ...companyObject,
      num: newNum,
    };
    investor1.shares = [...filtered, newShare];
  }
  await investor1.save();

  // response
  res.status(200).json({
    succes: true,
    order,
  });
});

// Accept order => /api/order/accept/:orderid
exports.acceptOrder = asyncHandler(async (req, res, next) => {
  const order1 = await Order.findById(req.params.orderid);
  const acceptingInvestor = await Investor.findById(req.investor.id);
  const orderInvestor = await Investor.findById(order1.investor);
  const company1 = await Company.findById(order1.company);
  if (order1.status !== "outstanding") {
    return next(new ErrorHandler(`the order is not outstanding`, 404));
  }
  // executed order to be returned
  let orders = {};
  if (order1.orderType === "selling") {
    // create buying order for accepting investor
    const isSufficient = acceptingInvestor.cashBalance >= order1.totalCost;
    if (!isSufficient) {
      return next(new ErrorHandler(`you do not have enough funds`, 404));
    }

    const orderb = await Order.create({
      company: company1._id,
      investor: acceptingInvestor._id,
      status: "executed",
      bid: order1.bid,
      volume: order1.volume,
      totalCost: order1.totalCost,
      orderType: "buying",
    });
    if (!orderb) {
      return next(new ErrorHandler(`failed to create order`, 404));
    }
    acceptingInvestor.cashBalance =
      acceptingInvestor.cashBalance - order1.totalCost;
    await acceptingInvestor.save();

    // execute order (give accepting investor shares)
    const companyObjectb = acceptingInvestor.shares.find(
      (element) => element.companyName === company1.name
    );
    //console.log(companyObject);
    if (!companyObjectb) {
      var newShareb = {
        companyRef: company1.id,
        companyName: company1.name,
        num: order1.volume,
      };
      acceptingInvestor.shares = [...acceptingInvestor.shares, newShareb];
    } else {
      var filteredb = acceptingInvestor.shares.filter(function (
        value,
        index,
        arr
      ) {
        return !Object.is(
          JSON.stringify(value),
          JSON.stringify(companyObjectb)
        );
      });
      var newNumb = Number(companyObjectb.num) + Number(order1.volume);
      newShareb = {
        ...companyObjectb,
        num: newNumb,
      };
      acceptingInvestor.shares = [...filteredb, newShareb];
    }
    await acceptingInvestor.save();

    // trasfer money to selling investor
    orderInvestor.cashBalance = orderInvestor.cashBalance + order1.totalCost;
    await orderInvestor.save();

    // change status of selling order
    order1.status = "executed";
    await order1.save();

    // create executed order
    orders = await ExecutedOrder.create({
      buying: orderb._id,
      selling: order1._id,
    });
  }
  if (order1.orderType === "buying") {
    // order investor gets shares and accepting investor gets money
    // create selling order for accepting investor (deduct shares)
    const companyObjectS = acceptingInvestor.shares.find(
      (element) => element.companyName === company1.name
    );

    if (!companyObjectS) {
      return next(
        new ErrorHandler(`you do not own shares in ${company1.name}`, 404)
      );
    }
    const isSufficient = companyObjectS.num >= order1.volume;
    if (!isSufficient) {
      return next(
        new ErrorHandler(
          `you do not own enough shares in ${company1.name}`,
          404
        )
      );
    }
    // create selling order
    const orderS = await Order.create({
      company: company1.id,
      investor: acceptingInvestor.id,
      status: "executed",
      bid: order1.bid,
      volume: order1.volume,
      totalCost: order1.totalCost,
      orderType: "selling",
    });
    if (!orderS) {
      return next(new ErrorHandler(`failed to create order`, 404));
    }
    // deduct shares from accepting investor
    var filteredS = acceptingInvestor.shares.filter(function (
      value,
      index,
      arr
    ) {
      return !Object.is(JSON.stringify(value), JSON.stringify(companyObjectS));
    });
    var newNumS = Number(companyObjectS.num) - Number(order1.volume);
    var newShareS = {
      ...companyObjectS,
      num: newNumS,
    };
    acceptingInvestor.shares = [...filteredS, newShareS];
    await acceptingInvestor.save();

    // execute order
    // trasfer shares to order investor
    const companyObjectB = orderInvestor.shares.find(
      (element) => element.companyName === company1.name
    );
    //console.log(companyObject);
    if (!companyObjectB) {
      var newShareB = {
        companyRef: company1.id,
        companyName: company1.name,
        num: order1.volume,
      };
      orderInvestor.shares = [...orderInvestor.shares, newShareB];
    } else {
      var filteredB = orderInvestor.shares.filter(function (value, index, arr) {
        return !Object.is(
          JSON.stringify(value),
          JSON.stringify(companyObjectB)
        );
      });
      var newNumB = Number(companyObjectB.num) + Number(order1.volume);
      newShareB = {
        ...companyObjectB,
        num: newNumB,
      };
      orderInvestor.shares = [...filteredB, newShareB];
    }
    await orderInvestor.save();

    // trasfer money to accepting investor
    acceptingInvestor.cashBalance =
      acceptingInvestor.cashBalance + order1.totalCost;
    await acceptingInvestor.save();

    // update order status
    order1.status = "executed";
    order1.save();

    // create executed order
    orders = await ExecutedOrder.create({
      buying: orderInvestor._id,
      selling: acceptingInvestor._id,
    });
  }
  res.status(200).json({ success: true, orders });
});

// get single order => /api/order/:id
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const orders = await Order.findById(req.params.id)
    .populate("investor", "username")
    .populate("company", "name");
  if (!orders) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({ success: true, orders });
});

// get invester orders => /api/order/me
exports.getYourOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ investor: req.investor.id }).populate({
    path: "company",
    select: "logo",
  });

  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({ success: true, orders });
});

// get all orders => /api/order/report?keyword=2022-09-22
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const rpp = 4;
  //let count = orders.length;
  const count = await Order.countDocuments();
  const order1 = await Order.find({
    date: {
      $gte: req.query.keyword,
      $lte: req.query.keyword + "T23:59:59",
    },
  });
  const apiFeatures = new ApiFeatures(
    Order.find()
      .populate({
        path: "company",
        select: "logo",
      })
      .sort({ date: -1 }),
    req.query
  )
    .search1()
    .pagination(rpp);

  let orders = await apiFeatures.query;

  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  //let count = orders.length;
  res.status(200).json({ success: true, orders, count, rpp, order1 });
});

// get all outstanding orders => /api/order/outstanding
exports.getAllOutstandingOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ status: "outstanding" }).populate({
    path: "company",
    select: "logo",
  });

  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({ success: true, orders });
});

// get all outstanding company orders => /api/order/outstanding/:companyid
exports.getAllOutstandingCompanyOrders = asyncHandler(
  async (req, res, next) => {
    const orders = await Order.find({
      status: "outstanding",
      company: req.params.companyid,
    }).populate({
      path: "company",
      select: "logo",
    });

    if (!orders) {
      return next(new ErrorHandler("No orders found", 404));
    }
    res.status(200).json({ success: true, orders });
  }
);
