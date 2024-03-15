// Version 1
// Basic UI is done, parts with interaction aren't working as expected 
import { useState, useEffect } from "react";

// put all functions here for now
export function Footers() {
    return (
        <footer className="footer-container">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="#">Oscar Godson</a></p>
        <p>Refactored by <a href="#">Christoph Burgmer</a></p>
        <p>Maintenanced by the TodoMVC team</p>
        Part of <a href="#">TodoMVC</a>
        </footer>
      );
}

export function Headers() {
    return (
        <h1 className="header-container">todos</h1>
    );
}

export function InputTextBox() {
    // set initial value of todoItems
    const [todoItems, setItems] = useState([]);
    const [value, setValue] = useState("");

    const [showList, setShowList] = useState(false);

    // create another state for completed stuff - will probs delete since idt we need it
    const [completedItems, setCompleted] = useState([]);

    // set a boolean to display completed/active items when user clicks button
    const [showDone, setShowDone] = useState(true);
    const [showActive, setShowActive] = useState(true);

    const addToList = (event) => {
        if (event.key == 'Enter' && event.target.value.trim() != "") {
            setItems([...todoItems, {"todos": event.target.value, "completed": false}])

            // reinitialize to empty string so that value is null
            setValue('');
        };
    };

    // need a case that is the default when no event is triggered
    // this counter has to update everytime user enters text


    const handleCheckboxChange = (event, index) => {

        // assign a temp variable to hold todoItems 
        let tempItems = todoItems;
        tempItems[index].completed = event.target.checked;
        setItems(tempItems);

        // doing this avoids the problem with mutation
        // setItems(items => { // here: items refer to todoItems 
        //     if (event.target.checked) {
        //       // Create a *new* object with changes
        //         items[index].completed = true;
            
        //       return items;
        //     } else if (!event.target.checked) {
        //         items[index].completed = false;
        //       return items;
        //     }
        // });
        // console.log(todoItems)
        // console.log(todoItems);
        // console.log("checked boxes:", todoItems.filter(item => item?.completed).length);
        // console.log("unchecked boxes:", todoItems.filter(item => !item?.completed).length);
        // console.log("All boxes:", todoItems.length);
        // let finishedItem = tempItems.filter(item => item?.completed).map((i) => i.todos);
        let finishedItem = tempItems.filter(item => item?.completed);
        console.log("Finished: ", finishedItem)
        setCompleted(finishedItem);
        console.log("Completed array: ", completedItems) // its not updating properly here, not sure if its getting mutated or smth
    };
    
    // for deleting items individually
    const deleteItem = (index) => {
        const updatedItems = todoItems.filter((_, idx) => idx !== index);
        setItems(updatedItems); // this creates a new array with only the elements with the indices that dont match
    };

    // delete ALL the checked items
    // const deleteAllItems = (event, index) => {
    //     // when press Clear completed button => delete all the ticked items

    //     if (index.completed == event.target.checked) {
    //         const updatedItems = todoItems.filter((_, idx) => idx !== index);
    //         setItems(updatedItems); 
    //     }       
    // }

    // this only works for the first time u press the button cos the thing is never changed back to false
    // const showAll = () => {
    //     setShowList(true);
    // };

    const [showAll, setShowAll] = useState(true);

    // const userClick = () => {
    //     setBtnClick(true);
    // };

    // useEffect(() => {
    //   if (btnClick) {
    //     setShowList(true);
    //   }
    // }, [btnClick]); // useEffect will run when buttonClicked changes 
    const displayAll = () => setShowAll(!showAll);

    const displayActive = () => setShowDone(!showDone);
    const displayDone = () => setShowActive(!showActive);

    return (
        <div>
            <input
                type="text"
                className="text-container"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={addToList}
                placeholder="What needs to be done?"
                value={value}
            />
            <label>
                {/* filter then map and use conditions to print out arrays of objects that are completed vs not vs all */}
                {todoItems.map(
                    (item, index) => 
                        <div
                            className="list-container"
                            id={index} // so we know which specific item we're getting
                            // NEED TO FIX UP THE STYLE HERE: its not displaying correctly
                            style={{ display: (!showDone && item.completed) || (!showActive && !item.completed) || (!showAll) ? 'none' : 'block' }} 
                        >
                            <input
                             type="checkbox"
                             className="check-container" //issue with key (must start by finding item then get its unique key and update the object based on its unique key)
                            //  checked={item.completed}
                             onChange={(event) => handleCheckboxChange(event, index)}
                             />
                             {item.todos}
                        <span className="delete-button"><a className="a-container" href="#" onClick={() => deleteItem(index)}>x</a></span>
                        </div> 
                )}
            </label>

           {/* <OptionButtons counts={todoItems.length - completedItems.length} showBlock="true" showStates={userClick}/> */}

            {/* { showList && <PrintAll todoItems={todoItems}/>} */}

            <OptionButtons counts={todoItems.length - completedItems.length} showBlock="true" showAll={displayAll} showActive={displayActive} showComplete={displayDone}/>

        </div>
    ); 

    
}

// get the radio buttons for selecting the specific items to display/delete
export function OptionButtons({counts, showBlock, showAll, showActive, showComplete}) {

    return (
        <div className="button-container" style={{display: showBlock ? 'block' : 'none'}}>
            <span>{counts} item left</span>
            <button type="radio" name="radioElements" className="btn-item" onClick={showAll}>All</button>
            <button type="radio" name="radioElements" className="btn-item" onClick={showActive}>Active</button>
            <button type="radio" name="radioElements" className="btn-item" onClick={showComplete}>Completed</button>
            <span className="btn-clear">Clear completed</span>
        </div>
    );
}

export function PrintAll({todoItems}) {
    return (
        <ul>
        {todoItems.map((obs) => <li>{obs.todos}</li>)}
        </ul>
    );
}

export function PrintDone({doneStuff}) {
    return (
        <ul>
            {doneStuff.map(item => <li>{item}</li>)}
        </ul>
    );
}

// export function StyleItems(item, showAll, showActive, showDone) {
//     let displayStyle = 'block';

//     if (!showDone && item.completed) {
//     displayStyle = 'none';
//     } else if (!showActive && !item.completed) {
//     displayStyle = 'none';
//     } else if (showAll) {
//     displayStyle = 'block';
//     } else {"block"};
// }

