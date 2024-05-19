sap.ui.define(
  [
    "./baseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

  ],
  function (BaseController, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("com.app.first_fs_app.controller.details", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onAuthorDetailsLoad, this);

      },
      onAuthorDetailsLoad: function (oEvent) {
        
        const { authorId } = oEvent.getParameter("arguments");
        this.ID = authorId;
        const sRouterName = oEvent.getParameter("name");
        const oForm = this.getView().byId("idAuthorDetailsObjectPage");

        oForm.bindElement(`/Books(${authorId})`, {
          expand: 'address,personalInfo'
        });
      },

      // last change here 17/05/2024
      // onDeleteAuthor: function () {
      // debugger
      //   try{
      //     const oModel = this.getView().getModel(),
      //     id = this.ID,
      //     sPath = `/Books(${id})`,
      //     oBinding = oModel.bindList("/Books");

      //     oBinding.delete(sPath,"$auto").then(function () {
      //       MessageToast.show(id + " SuccessFully Deleted");
      //       this.getRouter().navTo("RouteruserView");
      //       this.getView().byId("idAuthorTable").getBinding("items").refresh();
            
      //     })
      //   }
      //     catch(error){
            
      //         MessageToast.show("Deletion Error: ", error);
            

      //     }

      //   }
    });
  }
);
