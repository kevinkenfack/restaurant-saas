require("dotenv").config({});

const express = require("express");
const i18n = require('i18n');
const morgan = require("morgan");
const {rateLimit} = require("express-rate-limit");
const cors = require("cors");
// const path = require("path")
// const rfs = require("rotating-file-stream");
const cookieParser = require("cookie-parser");
const userAgent = require('express-useragent');
const { CONFIG, LANGUAGES } = require("./config");
const fileUpload = require("express-fileupload")
const path = require("path")

// routes import
const authRoutes = require("./routes/auth.routes");
const settingsRoutes = require("./routes/settings.routes");
const customerRoutes = require("./routes/customer.routes");
const reservationRoutes = require("./routes/reservation.routes");
const userRoutes = require("./routes/user.routes");
const menuItemRoutes = require("./routes/menu_item.routes");
const posRoutes = require("./routes/pos.routes");
const kitchenRoutes = require("./routes/kitchen.routes")
const ordersRoutes = require("./routes/orders.routes")
const invoiceRoutes = require("./routes/invoice.routes")
const dashboardRoutes = require("./routes/dashboard.routes")
const reportsRoutes = require("./routes/reports.routes")
const qrMenuRoutes = require("./routes/qrmenu.routes")
const feedbackRoutes = require("./routes/feedback.routes")
const superAdminRoutes = require("./routes/superadmin.routes")
const inventoryRoutes = require("./routes/inventory.routes");
// routes import


const app = express();

/**
 * Middlewares
 * */
// create write stream for logs
// const accessLogStream = rfs.createStream("access.log", {
//   interval: '1d',
//   path: path.join(__dirname, '../log')
// })

// const limiter = rateLimit({
//   max: 1000,
//   windowMs: 60000,
//   legacyHeaders: false,
//   standardHeaders: true,
//   message: "You exceeded limits! hold on",
// });


var corsWhitelist = [
  CONFIG.FRONTEND_DOMAIN,
];

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Configuration i18n améliorée
i18n.configure({
  locales: LANGUAGES,
  directory: path.join(__dirname, '../translations', 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
  syncFiles: true,
  api: {
    '__': '__',
    '__n': '__n'
  },
  register: global
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(i18n.init);

// MIDDLEWARE PERSONNALISÉ POUR FORCER LA DÉTECTION DE LANGUE
app.use((req, res, next) => {
  console.log('=== DÉTECTION LANGUE ===');
  console.log('URL:', req.originalUrl);
  console.log('Query lang:', req.query.lang);
  console.log('Cookie lang:', req.cookies.lang);
  console.log('Accept-Language:', req.headers['accept-language']);
  console.log('Locale initiale:', req.getLocale());
  
  let targetLang = null;
  
  // Priorité 1: Paramètre URL (?lang=fr)
  if (req.query.lang && LANGUAGES.includes(req.query.lang)) {
    targetLang = req.query.lang;
    console.log('✅ Langue détectée via URL:', targetLang);
  }
  // Priorité 2: Cookie
  else if (req.cookies.lang && LANGUAGES.includes(req.cookies.lang)) {
    targetLang = req.cookies.lang;
    console.log('✅ Langue détectée via Cookie:', targetLang);
  }
  // Priorité 3: Header Accept-Language
  else if (req.headers['accept-language']) {
    const acceptedLangs = req.headers['accept-language'].split(',');
    for (let lang of acceptedLangs) {
      const langCode = lang.split(';')[0].trim().substring(0, 2);
      if (LANGUAGES.includes(langCode)) {
        targetLang = langCode;
        console.log('✅ Langue détectée via Header:', targetLang);
        break;
      }
    }
  }
  
  // Appliquer la langue détectée
  if (targetLang) {
    req.setLocale(targetLang);
    res.setLocale(targetLang);
    
    // Synchroniser le cookie
    res.cookie('lang', targetLang, { 
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 an
      httpOnly: false,
      sameSite: 'lax',
      secure: false // Changez à true en production HTTPS
    });
    
    console.log('✅ Langue appliquée:', targetLang);
  }
  
  console.log('🎯 Locale finale:', req.getLocale());
  console.log('📝 Test traduction welcome:', res.__('welcome'));
  console.log('========================');
  
  next();
});

app.use(userAgent.express());
app.use('/api/v1/auth/stripe-webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
// app.use(morgan("combined", {stream: accessLogStream}));
app.use(fileUpload({
  preserveExtension: true,
  safeFileNames: true,
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "../tmp")
}))
app.use("/public", express.static(path.join(__dirname, "../public")))
app.use(morgan("tiny"));
// app.use(limiter);
/**
 * Middlewares
 * */

// Route de test pour vérifier la langue
app.get('/test-lang', (req, res) => {
  res.json({
    success: true,
    currentLocale: req.getLocale(),
    availableLocales: res.getLocales(),
    cookieLang: req.cookies.lang,
    queryLang: req.query.lang,
    acceptLanguage: req.headers['accept-language'],
    translations: {
      welcome: res.__('welcome'),
      test: res.__('test'),
      login: res.__('login')
    },
    timestamp: new Date().toISOString()
  });
});

// Route pour changer la langue via POST
app.post('/api/v1/change-language', (req, res) => {
  const { lang } = req.body;
  
  if (!lang || !LANGUAGES.includes(lang)) {
    return res.status(400).json({ 
      error: 'Langue non supportée',
      supportedLanguages: LANGUAGES 
    });
  }
  
  // Forcer la langue
  req.setLocale(lang);
  res.setLocale(lang);
  
  // Définir le cookie
  res.cookie('lang', lang, { 
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'lax',
    secure: false
  });
  
  res.json({
    success: true,
    message: res.__('language_changed') || 'Langue changée',
    newLocale: lang,
    timestamp: new Date().toISOString()
  });
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/menu-items", menuItemRoutes);
app.use("/api/v1/pos", posRoutes);
app.use("/api/v1/kitchen", kitchenRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/reports", reportsRoutes);
app.use("/api/v1/qrmenu", qrMenuRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/superadmin", superAdminRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
// routes

app.get("/", (req, res)=>{
  res.send("⚡️");
});


module.exports = app;