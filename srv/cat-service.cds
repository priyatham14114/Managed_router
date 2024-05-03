using my.bookshop as my from '../db/data-model';

    @path: '/CatalogSrv'
service CatalogService {
    @restrict: [{
        grant: '*' ,
        to : 'Admin'
    }]
         entity Books as projection on my.Books;
         entity Address as projection on my.Address;
         entity PersonalDetails as projection on my.PersonalDetails;
}
