# form-schema
A library for building and exporting a form schema that can be used to generate dynamic forms

# Usage

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

## Form Validation

You can write multiple validation adapters for different purposes. The idea behind this design
decision is you can create a validation adapter that only validates the form schema but doesn't
care about values. That way you use the form schema validation adapter to validate that the
user created the schema correctly (text fields require a label) and the form value validator
when validating user input (text fields with the required flag require a value to not be empty).

### Adapter
```
const exampleAdapter = {
  name: 'test',  // validation adapters must be named
  getFieldTypes: function() {
    /**
     * getFieldTypes returns a list of field types that this validator
     * is capable for validating. If a form schema contains a field
     * type that is not listed then this adapter will not attempt
     * to validate that field.
     *
     * every entry here should have a matching validation function
     * declared on the validation adapter
     */
    return ['text', 'customType'];
  },

  /**
   * executes validation for the text field type
   * This function takes the whole field object as a parameter
   * so this validator can validate any aspect of the field.
   *
   * Returns an array of error messages or false if there are no errors
   */
  text: function(field) {
    if (field.required) {
      if (field.value) {
        return false
      } else {
        return [ `${field.name} is required` ]
      }
    } else {
      return false;
    }
  },

  customType: function(field) {
    return false;
  },
};


const formSchema = new FormSchema();
formSchema.addField({type: 'text', name: 'First Name', required: true, value: null});
formSchema.addField({type: 'text', name: 'Last Name', required: false, value: null});
formSchema.registerValidator(exampleAdapter);

/**
 * isValid will be false and the error messages will be
 * appended to the field objects
 */
const isValid = await formSchema.validate();
```


### Example validation adapter for a form schema using Joi
```
const Joi = require('joi');

class FormSchemaAdapter {
  constructor() {
    this.name = 'schema';
  }

  getFieldTypes() {
    return [
      'text',
      'textarea',
      'number',
    ];
  }

  _getCommonSchema() {
    return {
      type: Joi.any().valid(this.getFieldTypes()),
      label: JoiSchema.standardString(255).required(),
      description: JoiSchema.standardString(10000),
      required: Joi.boolean(),
      error: Joi.alternatives().try(
        Joi.boolean().allow(false),
        Joi.object()
      )
    };
  }

  _validate(field, schema) {
    const result = Joi.validate(field.toJS(), schema);

    if (!result.error) {
      return false;
    } else {
      let errors = {};
      result.error.details.forEach(errorDetails => {
        errors[errorDetails.path] = errors[errorDetails.path] || [];
        errors[errorDetails.path].push(errorDetails.type);
      });

      return errors;
    }
  }

  text(field) {
    const fieldSchema = this._getCommonSchema();
    fieldSchema.value = JoiSchema.standardString();
    return this._validate(field, fieldSchema);
  }

  textarea(field) {
    const fieldSchema = this._getCommonSchema();
    fieldSchema.value = JoiSchema.standardString(10000);
    return this._validate(field, fieldSchema);
  }

  number(field) {
    const fieldSchema = this._getCommonSchema();
    fieldSchema.value = Joi.number();
    return this._validate(field, fieldSchema);
  }

  checkbox(field) {
    const fieldSchema = this._getCommonSchema();
    fieldSchema.value = Joi.boolean();
    return this._validate(field, fieldSchema);
  }
}

```

# Development

```
git clone git@github.com:synapsestudios/form-schema.git
cd form-schema
yarn install
```
