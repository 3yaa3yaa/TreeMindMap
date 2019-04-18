const assert = require('assert')

describe('SyncTest', function() {
    it('Equality', function() {
        assert(1+1===2)
        assert.equal(1+1, 2)
    })
})