sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.firstfsapp.controller.details", {
        onInit: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onAuthorDetailsLoad, this); 

        },
        onAuthorDetailsLoad:function(oEvent){
          // debugger
            const {authorId} = oEvent.getParameter("arguments");
            // const sRouterName = oEvent.getParameter("name");
            const oForm = this.getView().byId("idAuthorDetailsObjectPage");

            oForm.bindElement(`/Books(${authorId})`, {
                expand: 'address,personalInfo'
            });         
        }
      });
    }
  );
  