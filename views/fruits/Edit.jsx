const React = require('react');
const DefaultLayout = require('../Default.jsx');

class Edit extends React.Component {
    render() {
        const { fruit } = this.props;
        return (
            <DefaultLayout>
                <form action={`/fruits/${fruit._id}?_method=PUT`} method="POST">
                    <fieldset>
                    <legend>Edit {fruit.name}</legend>
                    <label>Name:<input type="text" name="name" placeholder="Enter Fruit Name" defaultValue={fruit.name}/>
                    </label>
                    <label>Color:<input type="text" name="color" placeholder="Enter Fruit Color" defaultValue={fruit.color}/>
                    </label>
                    <label>Ready To Eat:{fruit.readyToEat ? <input type="checkbox" name="readyToEat" defaultChecked/> : <input type="checkbox" name="readyToEat"/>}
                    </label>
                    </fieldset>
                    <input type="submit" value={`Edit ${fruit.name}`} />
                </form>
            </DefaultLayout>
        );
    };
};

module.exports = Edit;