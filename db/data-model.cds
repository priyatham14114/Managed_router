namespace my.bookshop;

using {cuid} from '@sap/cds/common';

entity Books : cuid {
      author       : String;
      bookName     : String;
      stock        : Integer;
      books_sold   : Integer;
      published_on : Date;
      phone        : String;
      address      : Association to Address;
      personalInfo : Composition of PersonalDetails;
      photo        : LargeString;

}

entity Address : cuid {
      city     : String;
      _address : String;
      pincode  : Integer;
      street   : String;
      landmark : String;
}

entity PersonalDetails : cuid {
      phone_number : String(15);
      email        : String(100);
      biography    : LargeString;
}
