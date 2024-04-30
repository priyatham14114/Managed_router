sap.ui.define(
    [
        "./baseController",
        "sap/m/MessageBox"
    ],
    function(BaseController,MessageBox) {
      "use strict";
  
      return BaseController.extend("com.app.firstfsapp.controller.details", {
        onInit: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onAuthorDetailsLoad, this); 

        },
        onAuthorDetailsLoad:function(oEvent){
          // debugger
            const {authorId} = oEvent.getParameter("arguments");
            this.ID = authorId;
            const sRouterName = oEvent.getParameter("name");
            const oForm = this.getView().byId("idAuthorDetailsObjectPage");

            oForm.bindElement(`/Books(${authorId})`, {
                expand: 'address,personalInfo'
            });         
        },
      onDeleteAuthor: async function(){
          debugger
          const oModel = this.getView().getModel();
          try {
            await this.deleteData(oModel, "/Books", this.ID);
            alert("deleted")
            this.getRouter().navTo("RouteuserView");
          } catch (error) {
            MessageBox.error("Some Technical Issue");
            // alert("its catch")
          }
        }
      });
    }
  );
  