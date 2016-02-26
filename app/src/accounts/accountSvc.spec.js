describe('accountSvc', function() {
  var accountDataById = {
    "id" : "CO556034",
    "displayName" : "31 Spooner St.",
    "product" : {
      "type" : "VA Home Purchase Loan",
      "propertyAddress" : {
        "street"  : "31 Spooner St.",
        "street2" : "",
        "city"    : "Quahog",
        "state"   : { "full" : "Rhode Island", "abbrev" : "RI" },
        "zip"     : "00093"
      },
      "purchaseAmount"       : "185000.00",
      "maxPreapprovalAmount" : "200000.00"
    },
    "loId": 42
  };
  
  var accountSvc = {};
  var $httpBackend;
  
  beforeEach(
    module('app')
  );
  
  beforeEach(
    inject(function(_AccountSvc_, _$httpBackend_) {
      accountSvc = _AccountSvc_;
      $httpBackend = _$httpBackend_;
    })
  );
  
  
  it('should return account data by account ID', function() {
    var response;
    
    var expectedUrl = '/assets/data/accounts.json';
    
    $httpBackend
      .when('GET', expectedUrl)
      .respond(200, accountDataById);
      
    accountSvc.getAccountById(2, function(response) {
      expect(response).to.equal(accountDataById);
    });
    
    $httpBackend.flush();
  });      
});