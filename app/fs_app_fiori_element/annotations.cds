using CatalogService as service from '../../srv/cat-service';
annotate service.Books with @(

    UI.SelectionFields:[
        author,
        bookName
    ],
    UI.FieldGroup #GeneratedGroup : {
        
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Author',
                Value : author,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Book Name',
                Value : bookName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Stock',
                Value : stock,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Books Sold',
                Value : books_sold,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Published On',
                Value : published_on,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Phone',
                Value : phone,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Photo',
                Value : photo,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'author',
            Value : author,
        },
        {
            $Type : 'UI.DataField',
            Label : 'bookName',
            Value : bookName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stock',
            Value : stock,
        },
        {
            $Type : 'UI.DataField',
            Label : 'books_sold',
            Value : books_sold,
        },
        {
            $Type : 'UI.DataField',
            Label : 'published_on',
            Value : published_on,
        },
    ],
);

annotate service.Books with {
    address @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Address',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : address_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'city',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : '_address',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'pincode',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'street',
            },
        ],
    }
};

annotate service.Books with {
    personalInfo @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'PersonalDetails',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : personalInfo_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'phone_number',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'email',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'biography',
            },
        ],
    }
};

