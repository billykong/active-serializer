# active-serializer
Rails active_model_serializer inspired nodejs object serializer

## Installation

  `npm install active-serializer --save`

## Usage

    const serialize = require('active-serializer');

    const object = { 
        id: 'some_id', 
        name: 'some_name', 
        unwanted: 'will not be shown',
        image_url: async (options) => { return await 'some_url' }
    };

    const attributes = ['id', 'name', 'image_url'];
    const options = {}

    const result = await serialize(object, attributes, options);
    console.log(result);
  
  Output should be: 
    { 
        id: 'some_id', 
        name: 'some_name', 
        image_url: 'some_url'
    }

### Nested Serialization
    const nestedObject = { 
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

    
    
    const object2Serializer = async (object2, options) => {
        const attributes2 = ['id', 'attr1'];
        return await serialize(object2, attributes2, options);
    };

    const attributes1 = ['id', 'name', 'image_url', 'object2'];
    const options = { 
        'serializers': { 'object2': object2Serializer }
    }
    const result = await serialize(nestedObject, attributes1, options);
    console.log(result);
  Output should be: 
    { 
        id: 'some_id', 
        name: 'some_name', 
        image_url: 'some_url',
        object2: {
            id: 'some_other_id',
            attr1: 'some_attr'
        }
    }


## Tests

  `npm test`

## Contributing
Please feel free and report issues or create pull request :]


[![Build Status](https://travis-ci.org/billykong/active-serializer.svg?branch=master)](https://travis-ci.org/billykong/active-serializer)