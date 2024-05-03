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


    // @ts-ignore
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
                    // @ts-ignore
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

                //  last change here.... check with datatype conversion 

                // const stock2 = parseInt(this.getView().getModel("newAuthorModel").getProperty("/stock"));
                // newAuthorModel.setProperty("/stock", stock2);
                // const books_sold = parseInt(this.getView().getModel("newAuthorModel").getProperty("/books_sold"));
                // const phone = parseInt(this.getView().getModel("newAuthorModel").getProperty("/phone"));
                this.getView().setModel(newAuthorModel, "newAuthorModel");


                // @ts-ignore
                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.onAuthorListLoad, this);

            },

            onAuthorListLoad: function () {
                // @ts-ignore
                this.getView().byId("idAuthorTable").getBinding("items").refresh();
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

                // @ts-ignore
                oBooksTable.getBinding("items").filter(aFilters);


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

            },
            // Routhing 
            onSelectAuthor: function (oEvent) {
                const { ID, author } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();

                // debugger
                // @ts-ignore
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetails", {
                    authorId: ID,
                    authorname: author
                })

            },
            // Opening of DailogBox 

            // @ts-ignore
            onCreateBtnPress: async function () {
                // @ts-ignore
                if (!this.oCreateAuthorDialog) {
                    // @ts-ignore
                    this.oCreateAuthorDialog = await this.loadFragment("createAuthor")
                }
                // @ts-ignore
                this.oCreateAuthorDialog.open();

            },

            //  closing of Dailogbox
            onCloseDialog: function () {
                // @ts-ignore
                if (this.oCreateAuthorDialog.isOpen()) {
                    // @ts-ignore
                    this.oCreateAuthorDialog.close()

                }
            },
            // @ts-ignore
            onCreateAuthor: async function () {
                debugger
                const oJsonModel = this.getView().getModel("newAuthorModel"),
                    oPayload = oJsonModel.getProperty("/");
                const oODataModel = this.getView().getModel("ModelV2");  // Get the OData V2 model
                const sEntitySet = "/Books";                    // The entity set 

               await oODataModel.create(sEntitySet, oPayload);      // path and payload

                // try {
                //     const oPayload = this.getView().getModel("newAuthorModel").getProperty("/"),
                //         oModel = this.getView().getModel();
                //     const oBinding = oModel.bindList("/Books");  // Bind to the entity set
                //     const oContext = oBinding.create(oPayload)
                //     this.getView().byId("idAuthorTable").getBinding("items").refresh();
                //     this.oCreateAuthorDialog.close();
                // }
                // catch (error) {
                //     MessageBox.error("Error creating entity: " + error.message);
                // };

                // const oPayload = this.getView().getModel("newAuthorModel").getProperty("/"),
                //     oModel = this.getView().getModel("ModelV2");
            }
        });
    });
