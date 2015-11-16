# From MixinComponentView
- showViewForCondition
    - IS view showing?
        - removeCurrentView
            component.dispose()
- showView
    - IS NOT initialized?
        - component.init
    - component.renderComponent(force)
    - component.mount
    
    
# From React
http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/

ReactClass = React.createClass({functs});
React.createElement(ReactClass, {props}, ...children);

# Nori
var factory = Nori.createComponent({functs});
var element = factory('id',{props}, ...children);