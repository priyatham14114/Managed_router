sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    'sap/ui/model/json/JSONModel'


// @ts-ignore
], function (Controller, Fragment, JSONModel) {
    'use strict';

    return Controller.extend("com.app.first_fs_app.controller.baseController", {

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },
        loadFragment: async function (sFragmentName) {
            const oFragment = await Fragment.load({
                id: this.getView().getId(),
                name: `com.app.firstfsapp.fragments.${sFragmentName}`,
                controller: this
            });
            this.getView().addDependent(oFragment);
            return oFragment
        },
        createData: function(oModel, oPayload, sPath){
            return new Promise((resolve, reject) => {
                oModel.create(sPath, oPayload, {
                    refreshAfterChange: true,
                    success: function(oSuccessData){
                        resolve(oSuccessData);
                    },
                    error: function(oErrorData){
                        reject(oErrorData)
                    }
                })
            })
        },
        
        deleteAuthor: function(oModel, sPath, ID){
            debugger
            // @ts-ignore
            return new Promise((resolve, reject) => {
                oModel.remove (`${sPath}/${ID}`,
                {
                    success: function(oSuccessData){
                        resolve(oSuccessData);
                    },
                    error: function(oErrorData){
                        reject(oErrorData)
                    }
                })
            })            
        }     
    })

});