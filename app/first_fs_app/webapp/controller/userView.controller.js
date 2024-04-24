sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/json/JSONModel',
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

                //  Mutltiinput start
                const oUserView = this.getView()
                const sAuthor = oUserView.byId("idAuthorValue"),
                    sBookName = oUserView.byId("idBooksNameValue"),
                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue"),
                    sPhone = oUserView.byId("idPhoneFilterValue")
                    
                const oMultiInputs = [sAuthor, sBookName, sNoOfBooksSold, sPhone]

                oMultiInputs.forEach((inputs) => {
                    // @ts-ignore
                    inputs.addValidator(function (args) {
                        if (true) {
                            var text = args.text;
                            return new Token({ key: text, text: text });
                        }
                    });

                });

                //  Mutltiinput end

            },

            // @ts-ignore
            onFilterClick: function (eve) {
                debugger
                const oUserView = this.getView()
                // @ts-ignore
                const sAuthor = oUserView.byId("idAuthorValue").getTokens();
                // console.log(sAuthor); 
                // @ts-ignore
                const sBookName = oUserView.byId("idBooksNameValue").getTokens(),
                    // @ts-ignore
                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue").getTokens(),
                    // @ts-ignore
                    sPhone = oUserView.byId("idPhoneFilterValue").getTokens()
                const oBooksTable = oUserView.byId("idBooksTable")
                var aFilters = [];
                var aInputsFields = [sAuthor, sBookName, sNoOfBooksSold, sPhone]

                aInputsFields.forEach((inputs) => {
                    console.log("these are aInputsFields", inputs);
                    inputs.forEach((item) => {
                        console.log("items", item);              // check with object it contains array of objects inside array of arrays
                        if (item.length > 0) {
                            item.filter((ele) => {
                                ele ? aFilters.push(new Filter("author", FilterOperator.EQ, ele.getKey())) : "";
                                ele ? aFilters.push(new Filter("bookName", FilterOperator.EQ, ele.getKey())) : "";
                                ele ? aFilters.push(new Filter("stock", FilterOperator.EQ, ele.getKey())) : "";
                                ele ? aFilters.push(new Filter("phone", FilterOperator.EQ, ele.getKey())) : "";
                            })
                        }
                    });
                })

                // console.log(aFilters);

                if (aFilters.length > 0) {
                    // @ts-ignore
                    oBooksTable.getBinding("items").filter(aFilters);
                }
                else {
                    console.log("Array not Initialized");
                }

            },
            onClear: function () {
                const oUserView = this.getView(),
                    // @ts-ignore
                    sAuthor = oUserView.byId("idAuthorValue").destroyTokens(),
                    // @ts-ignore
                    sBookName = oUserView.byId("idBooksNameValue").destroyTokens(),
                    // @ts-ignore
                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue").destroyTokens(),
                    // @ts-ignore
                    sPhone = oUserView.byId("idPhoneFilterValue").destroyTokens();

            }



        });
    });
