sap.ui.define([
    "./baseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/json/JSONModel',
    'sap/m/Token',
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */



    function (Controller, Filter, FilterOperator, JSONModel, Token, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("com.first_fs_app.controller.userView", {
            onInit: function () {

                //  Mutltiinput start
                const oUserView = this.getView()
                const sAuthor = oUserView.byId("idAuthorValue"),
                    sBookName = oUserView.byId("idBooksNameValue"),
                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue"),
                    sPhone = oUserView.byId("idPhoneFilterValue")

                const oMultiInputs = [sAuthor, sBookName, sNoOfBooksSold, sPhone]

                oMultiInputs.forEach((inputs) => {

                    inputs.addValidator(function (args) {
                        if (true) {
                            var text = args.text;
                            return new Token({ key: text, text: text });
                        }
                    });

                });

                //  Mutltiinput end

                const newAuthorModel = new JSONModel({
                    author: "",
                    bookName: "",
                    stock: "",
                    books_sold: "",
                    published_on: "",
                    phone: "",
                });

                //  last change here.... 
                this.getView().setModel(newAuthorModel, "newAuthorModel");



                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.onAuthorListLoad, this);

            },

            onAuthorListLoad: function () {

                this.getView().byId("idAuthorTable").getBinding("items").refresh();
            },


            onFilterClick: function (eve) {
                debugger
                const oUserView = this.getView()

                const sAuthor = oUserView.byId("idAuthorValue").getTokens();
                // console.log(sAuthor); 

                const sBookName = oUserView.byId("idBooksNameValue").getTokens(),

                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue").getTokens(),

                    sPhone = oUserView.byId("idPhoneFilterValue").getTokens()
                const oBooksTable = oUserView.byId("idAuthorTable")
                var aFilters = [];
                var aInputsFields = [sAuthor, sBookName, sNoOfBooksSold, sPhone];


                // sAuthor.filter((ele) => {
                //     ele ? aFilters.push(new Filter("author", FilterOperator.EQ, ele.getKey())) : "";
                // })

                aInputsFields.forEach((inputs) => {
                    if (inputs) {
                        inputs.filter((ele) => {
                            sAuthor.length > 0 ? aFilters.push(new Filter("author", FilterOperator.EQ, ele.getKey())) : "";
                            sBookName.length > 0 ? aFilters.push(new Filter("bookName", FilterOperator.EQ, ele.getKey())) : "";
                            sNoOfBooksSold.length > 0 ? aFilters.push(new Filter("books_sold", FilterOperator.EQ, ele.getKey())) : "";
                            sPhone.length > 0 ? aFilters.push(new Filter("phone", FilterOperator.EQ, ele.getKey())) : "";
                        })
                    }

                })

                // console.log(aFilters);


                oBooksTable.getBinding("items").filter(aFilters);


            },
            onClear: function () {
                const oUserView = this.getView(),

                    sAuthor = oUserView.byId("idAuthorValue").destroyTokens(),

                    sBookName = oUserView.byId("idBooksNameValue").destroyTokens(),

                    sNoOfBooksSold = oUserView.byId("idNoOfBooksSoldValue").destroyTokens(),

                    sPhone = oUserView.byId("idPhoneFilterValue").destroyTokens();

            },
            // Routhin
            onSelectAuthor: function (oEvent) {
                const { ID, author } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();

                // debugger

                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetails", {
                    authorId: ID,
                    authorname: author
                })

            },
            // Opening of Dailog


            onCreateBtnPress: async function () {

                if (!this.oCreateAuthorDialog) {

                    this.oCreateAuthorDialog = await this.loadFragment("createAuthor")
                }

                this.oCreateAuthorDialog.open();

            },

            //  closing of Dailogbox
            onCloseDialog: function () {

                if (this.oCreateAuthorDialog.isOpen()) {

                    this.oCreateAuthorDialog.close()

                }
            },
            onCreateAuthor: async function () {
                const oPayload = this.getView().getModel("newAuthorModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                try {
                    await this.createData(oModel, oPayload, "/Books");
                    this.getView().byId("idAuthorTable").getBinding("items").refresh();
                    this.oCreateAuthorDialog.close();
                } catch (error) {
                    this.oCreateAuthorDialog.close();
                    MessageBox.error("Some technical Issue");
                }

            }

        });
    });
