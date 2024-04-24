sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    // 'sap/ui/model/json/JSONModel',
    'sap/m/Token'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    // @ts-ignore
    function (Controller, Filter, FilterOperator, JSONModel, Token) {
        "use strict";

        return Controller.extend("com.app.firstfsapp.controller.userView", {
            onInit: function () {
                // debugger

                //  Mutltiinput start
                // var oView = this.getView();
                // var oMultiInputs = oView.byId("multiInput");
                // // @ts-ignore
                // oMultiInputs.addValidator(function (args) {
                //     if (true) {
                //         var text = args.text;
                //         return new Token({ key: text, text: text });
                //     }
                // });

                //  Mutltiinput end


            },
            // @ts-ignore
            onFilterClick: function (eve) {
                debugger
                const oUserView = this.getView()

                // @ts-ignore
                const sAuthor = oUserView.byId("idAuthorFilterValue").getValue(),

                    // @ts-ignore
                    sBookName = oUserView.byId("idBookNameFilterValue").getValue(),
                    //     // @ts-ignore
                    // @ts-ignore
                    sNoOfBooksSold = oUserView.byId("idNosoldbooksFilterValue").getValue(),
                    // @ts-ignore
                    sPhone = oUserView.byId("iPhoneFilterValue").getValue()
                const oBooksTable = oUserView.byId("idBooksTable")
                var aFilters = [];

                sAuthor ? aFilters.push(new Filter("author", FilterOperator.EQ, sAuthor)) : "";
                console.log(aFilters);

                sBookName ? aFilters.push(new Filter("bookName", FilterOperator.EQ, sBookName)) : "";
                sNoOfBooksSold ? aFilters.push(new Filter("stock", FilterOperator.EQ, sNoOfBooksSold)) : "";
                sPhone ? aFilters.push(new Filter("phone", FilterOperator.EQ, sPhone)) : "";

                if (aFilters) {
                    // @ts-ignore.
                    oBooksTable.getBinding("items").filter(aFilters);
                }
            },
            onClear: function () {
                const oUserView = this.getView()
                // ignore TYPE SCRIPT ERRORS
                const sAuthor = oUserView.byId("idAuthorFilterValue").setValue(""),
                    sBookName = oUserView.byId("idBookNameFilterValue").setValue(""),
                    sNoOfBooksSold = oUserView.byId("idNosoldbooksFilterValue").setValue(""),
                    sPhone = oUserView.byId("iPhoneFilterValue").setValue("");

            }



        });
    });
