# ffield
Small Node.js library for creating and validating data fields.

## Constants

<dl>
<dt><a href="#FIELD_TYPE">FIELD_TYPE</a></dt>
<dd><p>Field data types.</p>
</dd>
<dt><a href="#JS_TYPE">JS_TYPE</a></dt>
<dd><p>Representation of native JS types.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fieldTypeToJsType">fieldTypeToJsType(fieldType)</a> ⇒ <code>string</code></dt>
<dd><p>Convert field type to native js type.</p>
</dd>
<dt><a href="#validateField">validateField(field, fieldValidator)</a></dt>
<dd><p>Validate a field object.</p>
</dd>
<dt><a href="#createField">createField(fieldType, fieldData)</a></dt>
<dd><p>Create a field object.
Native js type of fieldData must match equivalent
fieldType.</p>
</dd>
<dt><a href="#updateField">updateField(field, newData)</a> ⇒ <code>Object</code></dt>
<dd><p>Update the data of a field object.
(Performs validation on updated field object too.)</p>
</dd>
<dt><a href="#cloneField">cloneField(field)</a> ⇒ <code>Object</code></dt>
<dd><p>Clone a field object.
(Performs validation on cloned field object too.)</p>
</dd>
</dl>

<a name="FIELD_TYPE"></a>

## FIELD\_TYPE
Field data types.

**Kind**: global constant  
<a name="JS_TYPE"></a>

## JS\_TYPE
Representation of native JS types.

**Kind**: global constant  
<a name="fieldTypeToJsType"></a>

## fieldTypeToJsType(fieldType) ⇒ <code>string</code>
Convert field type to native js type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fieldType | <code>string</code> | 

<a name="validateField"></a>

## validateField(field, fieldValidator)
Validate a field object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Object</code> | Field object to validate. |
| fieldValidator | <code>function</code> | Functional field validator. (true = valid) |

<a name="createField"></a>

## createField(fieldType, fieldData)
Create a field object.
Native js type of fieldData must match equivalent
fieldType.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fieldType | <code>string</code> | Field's data type. |
| fieldData | <code>\*</code> | Field's data content. |

<a name="updateField"></a>

## updateField(field, newData) ⇒ <code>Object</code>
Update the data of a field object.
(Performs validation on updated field object too.)

**Kind**: global function  
**Returns**: <code>Object</code> - Updated field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Object</code> | Field object to update. |
| newData | <code>\*</code> | New data to apply to field object. |

<a name="cloneField"></a>

## cloneField(field) ⇒ <code>Object</code>
Clone a field object.
(Performs validation on cloned field object too.)

**Kind**: global function  
**Returns**: <code>Object</code> - Cloned field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Object</code> | Field object to clone. |