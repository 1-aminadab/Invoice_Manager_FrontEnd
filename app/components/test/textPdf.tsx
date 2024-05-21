import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div ref={this.props.innerRef}>My cool content here!</div>
    );
  }
}

class Example extends React.PureComponent {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print this out!</button>;
          }}
          content={() => this.componentRef.current}
        />
        <ComponentToPrint innerRef={this.componentRef} />
      </div>
    );
  }
}

export default Example;
