import React, { useState } from 'react';

const Cat = ({ location }) => {
  console.log('location', location);
  return (
    <div>
      cat-left: {location.x} top: {location.y}
    </div>
  );
};

const Test = () => {
  return 'test';
};

const Dog = ({ location }) => {
  return (
    <div>
      dog-left: {location.x} top: {location.y}
    </div>
  );
};

const Mouse = (props) => {
  // console.log('props-----', props);
  const [location, setLocation] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setLocation({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      style={{ height: '50vh', border: '1px solid red' }}
      onMouseMove={handleMouseMove}
    >
      {/*
      使用 `render`prop 动态决定要渲染的内容，
      而不是给出一个 <Mouse> 渲染结果的静态表示
    */}
      {props.render(location)}
    </div>
  );
};

const MouseTracker = (Component) => {
  console.log('Component----', Component);
  return (
    <div>
      <Mouse render={(location) => <Component location={location} />} />
    </div>
  );
};

// HOC  结合render-props
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse
          render={(location) => (
            <Component {...this.props} location={location} />
          )}
        />
      );
    }
  };
}

// export default MouseTracker(Cat);
export default withMouse(Cat);
