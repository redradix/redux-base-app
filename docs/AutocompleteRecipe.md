# ReduxBaseApp Autocomplete recipe

We have implemented autocomplete functionality using [react-autocomplete](https://github.com/rackt/react-autocomplete) by the Rackt team. There is no documentation yet on the repo, so this is all we got :(

Brief explanation of our use case:

#Where

[Notifications Component](../example-app/src/components/create-order.js)

#How

###Installation
```
npm install --save react-autocomplete
```

### Concepts/Elements needed
Once you import the component the most tipical props you can pass to it are
- items: The array of possible suggestions
- shouldItemRender: A filter function to check if input of the user matches any of your suggestions. For UpperCase for example.
- sortItems: Order function
- onSelect(value, item): The function that will be executed when you select an item (enter or click). Probably you will call an action creator.
- getItemValue: A function that return the value that will be use as as the value parameter on OnSelect property
- renderItem(item, isHighlighted): A function that returns the jsx that will be render for each item matching the shouldItemRender property

Because we want to have all ui state (and also all the state of the app) on the store, probably you will want to pass the current value of the selected component in case you navigate on the app and return to the autocomplete, in order to have it as you left it. You can do that with initialValue property

If you want to bring your data asyncronously, just use the onChange property to do your request. You will probably call an action creator that will rerender your component when resolves.

It is also very helpful to give the autocomplete component a ref so you can access to its state. For example if you want to clear your input you can call
```
this.refs.createOrderAutocomplete.state.value = ""
```

```
<Autocomplete 
    ref = "createOrderAutocomplete"
    initialValue={selectedAutocompleteItem ? selectedAutocompleteItem.name : ""}
    items={totalDishes} 
    shouldItemRender={ matchStateToTerm }
    sortItems={sortItems}
    onSelect={(value, item) => {
      selectItemOnAutocomplete({ref: "create-order", item})
    }}
    getItemValue={(item) => item.name} 
    renderItem={(item, isHighlighted) => (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item.id}
      >{item.name}</div>
    )}
/>
<input ref="amount" type="integer" placeholder={t('createOrder.amountPlaceholder')} />
<input type="button" value={t('createOrder.add')} onClick={this.addDishToOrder.bind(this)} />
```

