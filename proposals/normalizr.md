Tree schema (separating leaves and intermediate nodes):

```js
export const domainSchema = new schema.Entity('domains')
export const groupSchema = new schema.Entity('groups')

const unionSchema = new schema.Union({
  domain: domainSchema,
  group: groupSchema
}, (domainOrGroup) => domainOrGroup.items ? 'group' : 'domain')

groupSchema.define({
  items: [unionSchema]
})

export const fleetSchema = groupSchema
```
