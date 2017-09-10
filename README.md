# active-serializer
Rails active_model_serializer inspired nodejs object serializer

## Installation

  `npm install active-serializer`

## Usage

    const serialize = require('serialize');

    const object = { id: 'some_id', name: 'some_name', unwanted: 'will not be shown'};
    object.logo_image_url = async (options) => { return await 'some_url' };
    const attributes = ['id', 'name', 'logo_image_url'];
    const options = {}

    console.log(serialize(object, attributes, options));
  
  
  Output should be { id: 'some_id', name: 'some_name', logo_image_url: 'some_url'}


## Tests

  `npm test`

## Contributing