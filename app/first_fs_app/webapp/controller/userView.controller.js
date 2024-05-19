sap.ui.define([
    "./baseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/json/JSONModel',
    'sap/m/Token',
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */



    function (Controller, Filter, FilterOperator, JSONModel, Token, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("com.first_fs_app.controller.userView", {
            onInit: function () {
                debugger
                const oTable = this.getView().byId("idAuthorTable");
                oTable.attachBrowserEvent("dblclick", this.onRowDoubleClick.bind(this));

                const newAuthorModel = new JSONModel({
                    author: "",
                    bookName: "",
                    stock: "",
                    books_sold: "",
                    phone: ""
                });

                this.getView().setModel(newAuthorModel, "newAuthorModel");
                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.onAuthorListLoad, this);

            },

            onAuthorListLoad: function () {
                this.getView().byId("idAuthorTable").getBinding("items").refresh();


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
            },

            //  Mutltiinput end



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
            // Routing by Double Click
            onRowDoubleClick: function () {
                debugger
                // const { ID, author } = oEvent.getSelectedItem().getBindingContext().getObject();
                // const { ID, author } = oEvent.getBindingContext().getObject();
                var oSelected = this.byId("idAuthorTable").getSelectedItem();
                var ID = oSelected.getBindingContext().getObject().ID;

                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetails", {
                    authorId: ID,

                })

            },
            // Opening of Dailogbox

            onCreateBtnPress: async function () {

                if (!this.oCreateAuthorDialog) {

                    this.oCreateAuthorDialog = await this.loadFragment("createAuthor")
                }

                this.oCreateAuthorDialog.open();

            },

            //  closing of Dailogboxes
            onCloseDialogCreateBox: function () {

                    if (this.oCreateAuthorDialog.isOpen()) {
                        this.oCreateAuthorDialog.close()
                }
                
            },
            

            onEdit: async function () {
                // this.byId("idCreateButton").setVisible(false); // depricated
                // this.getView().byId("idCreateAuthorDialog").setTitle("Update Author Details");
                if (!this.oCreateAuthorDialog) {
                    this.oCreateAuthorDialog = await this.loadFragment("createAuthor")
                }
                this.oCreateAuthorDialog.open();

                debugger
                var oSelected = this.byId("idAuthorTable").getSelectedItem();
                if (oSelected) {
                    // var oAuthor = oSelected.getBindingContext().getObject().ID;
                    var oAuthorName = oSelected.getBindingContext().getObject().author
                    var oAuthorBookName = oSelected.getBindingContext().getObject().bookName
                    var oStock = oSelected.getBindingContext().getObject().stock
                    var oBooksSold = oSelected.getBindingContext().getObject().books_sold
                    var ophone = oSelected.getBindingContext().getObject().phone

                    const newAuthorModel = new JSONModel({
                        author: oAuthorName,
                        bookName: oAuthorBookName,
                        stock: oStock,
                        books_sold: oBooksSold,
                        phone: ophone
                    });

                    this.getView().setModel(newAuthorModel, "newAuthorModel");
                }

            },

            //  Last change here...
            onUpdateAuthor: async function () {
                debugger
                const oPayload = this.getView().getModel("newAuthorModel").getProperty("/"),
                    oModel = this.getView().getModel(),
                    // oId = oPayload.getBindingContext().getObject().ID,
                    sPath = "/Books",
                    oBinding = oModel.bindList(sPath);                
                try {
                    await oBinding.push(oPayload);
                    this.getView().byId("idAuthorTable").getBinding("items").refresh();
                    this.oCreateAuthorDialog.close();
                } catch (error) {
                    // Handle error and close the dialog
                    console.error("Error during create operation:", error);
                    this.oCreateAuthorDialog.close();
                    MessageBox.error("Some technical issue occurred");
                }
            },

            // creating Author
            onCreateAuthor: async function () {
                debugger
                const oPayload = this.getView().getModel("newAuthorModel").getProperty("/"),
                    oModel = this.getView().getModel(),
                    oBinding = oModel.bindList("/Books");

                // Define the context binding for creation
                try {
                    // Create a new entry using the v4 create method
                    await oBinding.create(oPayload);

                    // Refresh the binding of the table to reflect new data
                    this.getView().byId("idAuthorTable").getBinding("items").refresh();

                    // Close the create author dialog
                    this.oCreateAuthorDialog.close();
                } catch (error) {
                    // Handle error and close the dialog
                    console.error("Error during create operation:", error);
                    this.oCreateAuthorDialog.close();
                    MessageBox.error("Some technical issue occurred");
                }
            },
            // last change here work with delete by checkbox

            onCheckDelete: function (oEvent) {
                debugger;
                var oSelected = this.byId("idAuthorTable").getSelectedItem();
                if (oSelected) {
                    var oAuthorName = oSelected.getBindingContext().getObject().author;

                    oSelected.getBindingContext().delete("$auto").then(function () {
                        MessageToast.show(oAuthorName + " SuccessFully Deleted");
                    },
                        function (oError) {
                            MessageToast.show("Deletion Error: ", oError);
                        });
                    this.getView().byId("idAuthorTable").getBinding("items").refresh();

                } else {
                    MessageToast.show("Please Select a Row to Delete");
                }
            },

            //  Toast with check box
            onCheck: function () {
                debugger
                var demoToast = this.getView().byId("demoToast");
                demoToast.setText("Selected");
                demoToast.show();
            }
        });
    });
