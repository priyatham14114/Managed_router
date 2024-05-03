sap.ui.define(
  [
    "./baseController",
    "sap/m/MessageBox"
  ],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("com.app.firstfsapp.controller.details", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onAuthorDetailsLoad, this);

      },
      onAuthorDetailsLoad: function (oEvent) {
        // debugger
        const { authorId } = oEvent.getParameter("arguments");
        this.ID = authorId;
        const sRouterName = oEvent.getParameter("name");
        const oForm = this.getView().byId("idAuthorDetailsObjectPage");

        oForm.bindElement(`/Books(${authorId})`, {
          expand: 'address,personalInfo'
        });
      },
      // @ts-ignore
      onDeleteAuthor: async function () {
        debugger;
        const oModel = this.getView().getModel("ModelV2");
        try {
         await this.deleteAuthor(oModel,"/Books",this.ID);
          this.getRouter().navTo("RouteruserView");
        }
        catch (error) {
          MessageBox.error("Some thechnical Issue");
        }
      }
    });
  }
);
