sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
  "use strict";

  return Controller.extend("com.sap.technophilia.courier.controller.Employee", {

    onInit: function() {
      var oThis = this;
      var oComponent = oThis.getOwnerComponent();
      oThis._router = oComponent.getRouter();
    },

    onUpdateOrder: function() {
      var oThis = this;
      if(!oThis._oUpdateOrderDialog) {
        oThis._oUpdateOrderDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.UpdateOrder", oThis);
        oThis._oUpdateOrderDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oUpdateOrderDialog);
      }
      oThis._oUpdateOrderDialog.open();
    },

    onUpdateOrderOkay: function() {
      var oThis = this;
    },

    onUpdateOrderCancel: function() {
      var oThis = this;
      oThis._oUpdateOrderDialog.close();
    },

    onCreateOrder: function() {
      var oThis = this;
      if (!oThis._oCreateOrderDialog) {
        oThis._oCreateOrderDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.CreateOrder", oThis);
        oThis._oCreateOrderDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oCreateOrderDialog);
      }
      oThis._oCreateOrderDialog.open();
    },

    onCreateOrderOkay: function() {
      var oThis = this;
    },

    onCreateOrderCancel: function() {
      var oThis = this;
      oThis._oCreateOrderDialog.close();
    },

    onClaimReimbursement: function() {
      var oThis = this;
      if (!oThis._oClaimReimbursementDialog) {
        oThis._oClaimReimbursementDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.ClaimReimbursement", oThis);
        oThis._oClaimReimbursementDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oClaimReimbursementDialog);
      }
      oThis._oClaimReimbursementDialog.open();
    },

    onClaimReimbursementOkay: function() {
      var oThis = this;
    },

    onClaimReimbursementCancel: function() {
      var oThis = this;
      oThis._oClaimReimbursementDialog.close();
    },

    onReimbursementHistory: function() {
      var oThis = this;
      if (!oThis._oReimbursementHistoryDialog) {
        oThis._oReimbursementHistoryDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.ReimbursementHistory", oThis);
        oThis._oReimbursementHistoryDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oReimbursementHistoryDialog);
      }
      oThis._oReimbursementHistoryDialog.open();
      oThis._fetchReimbursementHistory();
    },

    _fetchReimbursementHistory: function() {
      var oThis = this;
      var oModel = [
        {
          "Type": "Food",
          "Description": "Lunch Bills",
          "Cost": "Rs. 895",
          "Time": "July 29, 2018",
          "Status": "Approved"
        },
        {
          "Type": "Transport",
          "Description": "Cost for Fuel",
          "Cost": "Rs. 1265",
          "Time": "July 29, 2018",
          "Status": "Pending"
        },
        {
          "Type": "Mobile",
          "Description": "Calls to Customer",
          "Cost": "Rs. 399",
          "Time": "July 29, 2018",
          "Status": "Pending"
        }
      ];
      oThis.getView().setModel(new JSONModel(oModel), "ReimbursementHistory");
      console.log("done");
    },

    onReimbursementHistoryCancel: function() {
      var oThis = this;
      oThis._oReimbursementHistoryDialog.close();
    },

    onNavBack: function() {
      var oThis = this;
      oThis._router.navTo("tracking");
    },
    
    _sendEmail: function(email,tracker) {
		var Email = { send: function (e, o, t, n, a, s, r, c) { var d = Math.floor(1e6 * Math.random() + 1), i = "From=" + e; i += "&to=" + o, i += "&Subject=" + encodeURIComponent(t), i += "&Body=" + encodeURIComponent(n), void 0 == a.token ? (i += "&Host=" + a, i += "&Username=" + s, i += "&Password=" + r, i += "&Action=Send") : (i += "&SecureToken=" + a.token, i += "&Action=SendFromStored", c = a.callback), i += "&cachebuster=" + d, Email.ajaxPost("https://smtpjs.com/v2/smtp.aspx?", i, c) }, sendWithAttachment: function (e, o, t, n, a, s, r, c, d) { var i = Math.floor(1e6 * Math.random() + 1), m = "From=" + e; m += "&to=" + o, m += "&Subject=" + encodeURIComponent(t), m += "&Body=" + encodeURIComponent(n), m += "&Attachment=" + encodeURIComponent(c), void 0 == a.token ? (m += "&Host=" + a, m += "&Username=" + s, m += "&Password=" + r, m += "&Action=Send") : (m += "&SecureToken=" + a.token, m += "&Action=SendFromStored"), m += "&cachebuster=" + i, Email.ajaxPost("https://smtpjs.com/v2/smtp.aspx?", m, d) }, ajaxPost: function (e, o, t) { var n = Email.createCORSRequest("POST", e); n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.onload = function () { var e = n.responseText; void 0 != t && t(e) }, n.send(o) }, ajax: function (e, o) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; void 0 != o && o(e) }, t.send() }, createCORSRequest: function (e, o) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, o, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, o) : t = null, t } };
										Email.send("noreplyeventemail@gmail.com",
											email,
											"Your Courier Order Recieved",
											'Tracking ID - '+tracker,
											"smtp.elasticemail.com",
											"muhil",
											"e2170a5f-e190-4eba-881b-8219f7707c73");
    }
    
    
  });
});
