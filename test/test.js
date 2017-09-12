'use strict';

const expect = require('chai').expect;
const serialize = require('../index');

describe('#serialize', function() {
  var nestedObject;
  beforeEach(async () => {
    nestedObject = { 
        id: 'some_id', 
        name: 'some_name', 
        unwanted: 'will not be shown',
        image_url: async (options) => { return await 'some_url' },
        object2: {
            id: 'some_other_id',
            attr1: 'some_attr',
            attr2: 'will not be shown'
        }
    };
  });


  it('should mask object with attributes only', async () => {
    const attributes = ['id', 'name'];
    const result = await serialize(nestedObject, attributes, {});
    expect(result.id).to.equal('some_id');
    expect(result.name).to.equal('some_name');
    expect(result.unwanted).to.be.an('undefined');
    expect(result.object2).to.be.an('undefined');
  });

  it('should call object.attr() when exist', async () => {
    const attributes = ['id', 'name', 'image_url'];
    const result = await serialize(nestedObject, attributes, {});
    expect(result.id).to.equal('some_id');
    expect(result.name).to.equal('some_name');
    expect(result.image_url).to.equal('some_url');
  });

  it('should serialize with nestedObject through passing serializers in options', async () => {
    const nestedAttributes = ['id', 'name', 'image_url', 'object2'];
    const object2Serializer = async (object2, options) => {
        const object2Attributes = ['id', 'attr1'];
        return await serialize(object2, object2Attributes, options);
    };
    const options = { 
        'serializers': { 'object2': object2Serializer }
    }
    const result = await serialize(nestedObject, nestedAttributes, options);
    expect(result.id).to.equal('some_id');
    expect(result.name).to.equal('some_name');
    expect(result.image_url).to.equal('some_url');
    expect(result.unwanted).to.be.an('undefined');
    expect(result.object2.id).to.equal('some_other_id');
    expect(result.object2.attr1).to.equal('some_attr');
    expect(result.object2.attr2).to.be.an('undefined');
  });

  it('should ignore missing attributes', async () => {
    const attributes = ['id', 'name', 'nonexist'];
    const result = await serialize(nestedObject, attributes, {});
    expect(result.id).to.equal('some_id');
    expect(result.name).to.equal('some_name');
    expect(result.unwanted).to.be.an('undefined');
    expect(result.object2).to.be.an('undefined');
    expect(result.nonexist).to.be.an('undefined');
  });

});


