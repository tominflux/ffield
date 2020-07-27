# ffield
Small Node.js library for creating and validating data fields.

## Functions

<dl>
<dt><a href="#fieldTypeToJsType">fieldTypeToJsType(fieldType)</a> ⇒ <code>JS_TYPE</code></dt>
<dd><p>Convert catalogg field type to native js type.</p>
</dd>
<dt><a href="#jsTypeToFieldType">jsTypeToFieldType(jsType)</a> ⇒ <code>FIELD_TYPE</code></dt>
<dd><p>Convert native js type to catalogg field type.</p>
</dd>
<dt><a href="#createField">createField(fieldType, fieldData)</a></dt>
<dd><p>Create a catalogg field object.</p>
</dd>
<dt><a href="#validateField">validateField(field, fieldValidator)</a></dt>
<dd><p>Validate a catalogg field object.</p>
</dd>
<dt><a href="#updateField">updateField(field, newData)</a> ⇒ <code>*</code></dt>
<dd><p>Update the data of a catalogg field object.
(Performs validation on updated field object too.)</p>
</dd>
<dt><a href="#cloneField">cloneField(field)</a> ⇒ <code>*</code></dt>
<dd><p>Clone a catalogg field object.
(Performs validation on cloned field object too.)</p>
</dd>
</dl>

<a name="fieldTypeToJsType"></a>

## fieldTypeToJsType(fieldType) ⇒ <code>JS\_TYPE</code>
Convert catalogg field type to native js type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fieldType | <code>FIELD\_TYPE</code> | 

<a name="jsTypeToFieldType"></a>

## jsTypeToFieldType(jsType) ⇒ <code>FIELD\_TYPE</code>
Convert native js type to catalogg field type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| jsType | <code>JS\_TYPE</code> | 

<a name="createField"></a>

## createField(fieldType, fieldData)
Create a catalogg field object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fieldType | <code>FIELD\_TYPE</code> | catalogg data type |
| fieldData | <code>\*</code> | Native js data type must match field type |

<a name="validateField"></a>

## validateField(field, fieldValidator)
Validate a catalogg field object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to validate. |
| fieldValidator | <code>\*</code> | Optional functional field validator. (true = valid) |

<a name="updateField"></a>

## updateField(field, newData) ⇒ <code>\*</code>
Update the data of a catalogg field object.
(Performs validation on updated field object too.)

**Kind**: global function  
**Returns**: <code>\*</code> - Updated field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to update. |
| newData | <code>\*</code> | New data to apply to field object. |

<a name="cloneField"></a>

## cloneField(field) ⇒ <code>\*</code>
Clone a catalogg field object.
(Performs validation on cloned field object too.)

**Kind**: global function  
**Returns**: <code>\*</code> - Cloned field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to clone. |