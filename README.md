# form-schema
A library for building and exporting a form schema that can be used to generate dynamic forms

# Usage

## addField
```
const FormSchema = require('@synapsestudios/form-schema');
const formSchema = new FormSchema();

// addField with string args. Requires a name and a type
formSchema.addField('name', 'hidden');

// addField with object arg. Requires a name and a type
formSchema.addField({
  name: 'some-great-field',
  type: 'text',
  label: 'Some Greate Field',
  value: 'This is a cool field!',
});

// get the form schema as a plain old javascript object
const schema = formSchema.getFormSchema();

// remove a field by name
formSchema.removeField('some-great-field');
```

# Development

```
git clone git@github.com:synapsestudios/form-schema.git
cd form-schema
yarn install
```
