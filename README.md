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

utopia@utopia-X555LJ:~/Source/ffield$ npm publish
npm notice 
npm notice 📦  ffield@0.1.0
npm notice === Tarball Contents === 
npm notice 643B   package.json
npm notice 6.0kB  index.js    
npm notice 35.1kB LICENSE     
npm notice 2.9kB  README.md   
npm notice === Tarball Details === 
npm notice name:          ffield                                  
npm notice version:       0.1.0                                   
npm notice package size:  14.8 kB                                 
npm notice unpacked size: 44.7 kB                                 
npm notice shasum:        a296760458061adf4182ccd3d72e130809b87ba2
npm notice integrity:     sha512-r9wDrm5HbKj/L[...]lCtXIL/y9wqQA==
npm notice total files:   4                                       
npm notice 
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! You cannot publish over the previously published versions: 0.1.0. : ffield

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/utopia/.npm/_logs/2020-07-27T13_50_24_395Z-debug.log
utopia@utopia-X555LJ:~/Source/ffield$ npm publish
npm notice 
npm notice 📦  ffield@0.1.1
npm notice === Tarball Contents === 
npm notice 643B   package.json
npm notice 6.0kB  index.js    
npm notice 35.1kB LICENSE     
npm notice 2.9kB  README.md   
npm notice === Tarball Details === 
npm notice name:          ffield                                  
npm notice version:       0.1.1                                   
npm notice package size:  14.8 kB                                 
npm notice unpacked size: 44.7 kB                                 
npm notice shasum:        0c9829c915306232734d1993e1aef9855d2ec4f7
npm notice integrity:     sha512-HU0H/tHk45aHA[...]WChHOc/5nlEbw==
npm notice total files:   4                                       
npm notice 
+ ffield@0.1.1
utopia@utopia-X555LJ:~/Source/ffield$ jsdoc2md index.js
## Functions

<dl>
<dt><a href="#fieldTypeToJsType">fieldTypeToJsType(fieldType)</a> ⇒ <code>JS_TYPE</code></dt>
<dd><p>Convert field type to native js type.</p>
</dd>
<dt><a href="#jsTypeToFieldType">jsTypeToFieldType(jsType)</a> ⇒ <code>FIELD_TYPE</code></dt>
<dd><p>Convert native js type to field type.</p>
</dd>
<dt><a href="#createField">createField(fieldType, fieldData)</a></dt>
<dd><p>Create a field object.</p>
</dd>
<dt><a href="#validateField">validateField(field, fieldValidator)</a></dt>
<dd><p>Validate a field object.</p>
</dd>
<dt><a href="#updateField">updateField(field, newData)</a> ⇒ <code>*</code></dt>
<dd><p>Update the data of a field object.
(Performs validation on updated field object too.)</p>
</dd>
<dt><a href="#cloneField">cloneField(field)</a> ⇒ <code>*</code></dt>
<dd><p>Clone a field object.
(Performs validation on cloned field object too.)</p>
</dd>
</dl>

<a name="fieldTypeToJsType"></a>

## fieldTypeToJsType(fieldType) ⇒ <code>JS\_TYPE</code>
Convert field type to native js type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fieldType | <code>FIELD\_TYPE</code> | 

<a name="jsTypeToFieldType"></a>

## jsTypeToFieldType(jsType) ⇒ <code>FIELD\_TYPE</code>
Convert native js type to field type.

**Kind**: global function  

| Param | Type |
| --- | --- |
| jsType | <code>JS\_TYPE</code> | 

<a name="createField"></a>

## createField(fieldType, fieldData)
Create a field object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fieldType | <code>FIELD\_TYPE</code> | data type |
| fieldData | <code>\*</code> | Native js data type must match field type |

<a name="validateField"></a>

## validateField(field, fieldValidator)
Validate a field object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to validate. |
| fieldValidator | <code>\*</code> | Optional functional field validator. (true = valid) |

<a name="updateField"></a>

## updateField(field, newData) ⇒ <code>\*</code>
Update the data of a field object.
(Performs validation on updated field object too.)

**Kind**: global function  
**Returns**: <code>\*</code> - Updated field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to update. |
| newData | <code>\*</code> | New data to apply to field object. |

<a name="cloneField"></a>

## cloneField(field) ⇒ <code>\*</code>
Clone a field object.
(Performs validation on cloned field object too.)

**Kind**: global function  
**Returns**: <code>\*</code> - Cloned field object.  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>\*</code> | Field object to clone. |