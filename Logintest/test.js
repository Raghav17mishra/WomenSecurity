
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import React, { Component } from 'react';

import Svg,{ Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

 class TabBarItem extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let child = this.props.children;

        if (child.length && child.length > 0) {
            throw new Error('onlyChild must be passed a children with exactly one child.');
        }

        return (
            <View style={{flex: 1}}>
                {child}
            </View>
        );
    }
}

export default class TabBar extends Component{
    constructor(props) {
        super(props);

        // if (this.props.children.length !== 3) {
        //     throw new Error('Three tab should be work.');
        // }
        this.state = {
            selectedIndex: 1,
            defaultPage: 1,
            navFontSize: 12,
            navTextColor: 'rgb(148, 148, 148)',
            navTextColorSelected: 'rgb(51, 163, 244)',
            circleRadius: new Animated.Value(546),
            pathD: new Animated.Value(357),
            pathX: '357',
            pathY: '675',
            pathA: '689',
            pathB: '706',
            showIcon: true,
        };

        this.state.circleRadius.addListener( (circleRadius) => {
            this._myCircle.setNativeProps({ cx: circleRadius.value.toString() });
        });

        this.state.pathD.addListener( a => {
            this.setState({
                pathX: a.value.toString(),
                pathY: (318 + parseInt(a.value)).toString(),
                pathA: (330 + parseInt(a.value)).toString(),
                pathB: (350 + parseInt(a.value)).toString(),
            });
        });
    }

    render() {
        const { children, bgNavBar, bgNavBarSelector, stroke } = this.props;
        const {
            selectedIndex,
            navFontSize,
            navTextColor,
            navTextColorSelected,
            showIcon,
        } = this.state;

        let _d;
        if (this.state.pathY == '' && this.state.pathA == '' && this.state.pathB == ''){
            _d = '1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6';
        } else {
            _d = `M30,60h${this.state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`;
        }

        return (
            <View style={[styles.container,this.props.style, children[this.state.selectedIndex].props.screenBackgroundColor ?
                children[this.state.selectedIndex].props.screenBackgroundColor :
                '#008080',
            ]}>

                {children[selectedIndex]}

                <View style={[styles.content]}>
                    <View style={styles.subContent}>
                        {
                            React.Children.map(children,  (child,i) => {
                                const imgSrc = selectedIndex === i && showIcon ?
                                    <View style={styles.circle}>
                                        <Image
                                            style={styles.navImage}
                                            resizeMode="cover"
                                            source={child.props.selectedIcon}
                                        />
                                    </View>
                                :
                                    <Image
                                        style={styles.navImage}
                                        resizeMode="cover"
                                        source={child.props.icon}
                                    />;
                                return (
                                    <TouchableHighlight
                                        key={i}
                                        underlayColor={'transparent'}
                                        style={styles.navItem}
                                        onPress={() => this.update(i)}
                                    >
                                        {imgSrc}
                                    </TouchableHighlight>
                                );
                            })
                        }
                    </View>
                    <Svg version="1.1" id="bottom-bar" x="0px" y="0px" width="100%" height="100" viewBox="0 0 1092 260" space="preserve">
                        <AnimatedPath
                            fill={bgNavBar ? bgNavBar : '#f0f0f0'}
                            stroke={stroke ? stroke : '#f0f0f0'}
                            d={ `M30,60h${this.state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${this.state.pathY}.7,74.5,${this.state.pathA}.5,60,${this.state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`
                        }/>
                        <AnimatedCircle
                            ref={ ref => this._myCircle = ref }
                            fill={bgNavBarSelector ? bgNavBarSelector : '#f0f0f0'}
                            stroke={stroke ? stroke : '#f0f0f0'}
                            cx="546" cy="100"
                            r="100"
                        />
                    </Svg>
                </View>
            </View>
        );
    }

    update(index) {
        let that = this;

        that.setState({
            selectedIndex: index,
            showIcon: false,
        });

        if (index === 0){
            Animated.spring( that.state.pathD, { toValue: 22,duration: 10, friction: 10 }).start();
            setTimeout(function() {
                that.setState({
                    showIcon: true,
                });
            }, 100);
            Animated.spring( that.state.circleRadius, { toValue: 211, friction: 10 } ).start();
        } else if (index === 2){
            Animated.spring( that.state.pathD, { toValue: 691,duration: 10, friction: 10 }).start();

            setTimeout(function() {
                that.setState({
                    showIcon: true,
                });
            }, 100);
            Animated.spring( that.state.circleRadius, { toValue: 880, friction: 10 } ).start();
        } else {
            Animated.spring( that.state.pathD, { toValue: 357,duration: 10, friction: 10 }).start();

            setTimeout(function() {
                that.setState({
                    showIcon: true,
                });
            }, 100);
            Animated.spring( that.state.circleRadius, { toValue: 546, friction: 10 } ).start();
        }
    }
}

TabBar.Item = TabBarItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flexDirection:'column',
        zIndex: 0,
        width: (Dimensions.get('window').width - 30),
        marginBottom: '4%',
        left: '4%',
        right: '4%',
        position: 'absolute',
        bottom: '1%',
    },
    subContent: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 5,
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
        zIndex: 0,
    },
    navImage: {
        width: 45,
        height: 45,
    },
    circle: {
        bottom: 18,
    },
});




// // import React, {Component} from 'react';
// // import {Text,View} from 'react-native';

// // export default class SignUnComponent extends React.Component{
// //     render(){
// //         return(
// //             <View>
// //                 <Text>SignUnComponent</Text>
// //             </View>
// //         )
// //     }
// // }



// import React, { Component } from 'react';
// import {
//     Text,
//     View,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     TextInput,
//     ActivityIndicator,
//     TouchableNativeFeedback,
//     Button,
//     DatePickerAndroid,
//     DatePickerIOS,
//     Dimensions,
//     SplitPane,
//     SlideView,

// }
//     from 'react-native';
// import Firebase from './Firebase.js';
// // import { createAppContainer } from 'react-navigation';
// // import { createStackNavigator } from 'react-navigation-stack';


// const { width, height } = Dimensions.get('window');
// // import styles from './styles';
// // import {CheckBox} from 'react-native-elements'
// // import NumbertButtons from './src/component/NumberButton/index.js';

// export default class PageOne extends Component {

//     function() { alert("You are now registered") };

//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             passwordValidate: true,
//             usernameValidate: true,
//             phoneValidate: true,
//             Transfer_username: '',
//             Transfer_password: '',
//             warning: '',
//             name: '',
//             email: '',
//             password: ''
//         }
//         //  {chosenDate: new Date()};

//         this.setDate = this.setDate.bind(this);
//     }

//     setDate(newDate) {
//         this.setState({ chosenDate: newDate });
//     }

//     handleSignUp = () => {
//         const { email, password } = this.state
//         Firebase.auth()
//             .createUserWithEmailAndPassword(email, password)
//             // .then(() => this.props.navigation.navigate('Profile'))
//             // alert('ho gaya')
//             .catch(error => console.warn(error))
//     }
//     validate() {

//         const { username, password } = this.state
//         if (username == '') {
//             alert('please enter correct email')
//             return false
//         } else if (password == '') {
//             alert('please enter correct passeord')
//             return false
//         }

//         return true
//     }

//     passwordCheck(text, type) {
//         // const{password} = this.state

//         id = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//         pass = /^[0-9a-zA-Z]+$/
//         if (type == 'username') {
//             if (id.test(text)) {
//                 // console.error("worng")
//                 this.setState({
//                     username: text,
//                     usernameValidate: true,
//                     warning: ''
//                 })
//             } else {
//                 this.setState({
//                     usernameValidate: false,
//                     warning: 'Email type not correct'
//                 })
//             }

//         }
//         // 
//         else if (type == 'password') {
//             if (text.length < 8) {
//                 this.setState({
//                     passwordValidate: false,
//                     warning: 'password is too small'
//                 })
//             } else if (pass.test(text)) {
//                 this.setState({
//                     password: text,
//                     passwordValidate: true,
//                     warning: ''
//                 })
//             }
//             else {
//                 this.setState({
//                     passwordValidate: false,
//                     warning: 'password is too small'

//                 })
//             }

//         } else if (type == 'phone') {

//             if (text.length < 10) {

//                 this.setState({
//                     phoneValidate: false,
//                     warning: 'Enter correct phone number'
//                 })
//             }
//             else {
//                 this.setState({

//                     phoneValidate: true,
//                     warning: ''

//                     // warning:''
//                 })
//             }


//         }
//         else if (text.length < 6) {
//             console.warn('password length is too small')
//         }
//         else {
//             return true
//         }
//     }

//     all_validate_check() {
//         if (this.validate()) {

//             alert('2')
//             // await AsyncStorage.setItem('username', this.state.username)
//             // await AsyncStorage.setItem('password', this.state.password)
//             // alert(this.state.phone +'\n' + this.state.name)
//             // alert('3')
//             // User.username = this.state.username;
//             // User.password = this.state.password;
//             const { username, password } = this.state
//             Firebase.auth()
//                 .createUserWithEmailAndPassword(username, password)
//                 // .then(() => this.props.navigation.navigate('Profile'))
//                 // alert('ho gaya')
//                 .catch(error => console.warn(error))
//             // alert('4')
//             this.props.navigation.navigate('Home')

//         }
//     }

//     render() {
//         let pic = { uri: 'https://img-aws.ehowcdn.com/700x/cdn.onlyinyourstate.com/wp-content/uploads/2016/10/15954629975_795d3c949c_k-700x466.jpg' };
//         // let logo = {uri:'data:image/jpeg;base64,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'}
//         let logo = { uri: 'http://www.pngplay.com/wp-content/uploads/1/Purple-Butterfly-PNG-Transparent-File.png' }

//         return (
//             <ScrollView >
//                 <View >

//                     <Image source={pic} style={{ width: width, height: 630, top: 0 }} />
//                     <View style={{ position: 'absolute', width: 330 }}>
//                         <Image
//                             source={logo} style={{ width: 170, alignSelf: 'center', height: 140, top: 9, borderRadius: 15, position: 'absolute' }}
//                         />
//                     </View>


//                     <View style={Styles.blueS}>
//                         <Text style={{ fontSize: 20, color: 'red', top: 5, width: 250, alignSelf: 'center' }}>{this.state.warning}</Text>

//                         {/* <TextInput
//                             style={{ width: 270, fontSize: 18, borderRadius: 14, backgroundColor: 'white', top: 9, height: 45, alignSelf: 'center' }}
//                             placeholder='Enter your Name'
//                             onChangeText={name => this.setState({ name })}
//                         /> */}
//                         <TextInput
//                             style={[Styles.emailStyle,
//                             !this.state.usernameValidate ? Styles.password_Error : null]}
//                             placeholder='email@gmil.com'
//                             keyboardType='email'
//                             // onChangeText={(text)=>this.setState({input:Text})}
//                             onChangeText={(val) => this.passwordCheck(val, 'username')}
//                         />
//                         <TextInput
//                             style={[Styles.passstyle, !this.state.passwordValidate ? Styles.password_Error : null]}
//                             placeholder='Enter your password'
//                             secureTextEntry={true}
//                             onChangeText={(val) => this.passwordCheck(val, 'password')}
//                         />

//                         <Text style={{ top: 46, fontSize: 16, alignSelf: 'center', width: 255, color: 'white' }}>Use ChackBox here for terms and condition</Text>

//                         <TouchableOpacity onPress={() => this.all_validate_check()} style={{ width: 50, backgroundColor: 'green', width: 100, alignSelf: 'center', height: 40, borderWidth: 1, top: 60, positiion: 'absolute' }}>
//                             <Text style={{ color: 'white', fontSize: 18, top: 6, alignSelf: 'center' }}>Registers</Text>
//                         </TouchableOpacity>



//                     </View>
//                     <View style={{ position: 'absolute', top: 520, width: 305, alignSelf: 'center' }}>
//                     </View>

//                 </View>

//             </ScrollView>
//         );
//     }
// }
// const Styles = StyleSheet.create
//     ({

//         blueS: {
//             top: 190,
//             // flex:2,
//             backgroundColor: '#98989898',
//             width: 300,
//             height: 420,
//             alignSelf: 'center',
//             position: 'absolute',
//             // flex: 3,
//             // backgroundColor: 'white',
//             borderTopRightRadius: 30,
//             borderTopLeftRadius: 30,
//             paddingVertical: 30,
//             paddingHorizontal: 20,
//         },
//         emailStyle: { width: 270, fontSize: 18, borderRadius: 14, backgroundColor: 'white', top: 18, height: 45, alignSelf: 'center' },
//         password_Error: {
//             // backgroundColor: 'skyblue',
//             borderRadius: 5,
//             borderColor: 'red',
//             borderBottomColor: 'red',
//             borderWidth: 3
//         },
//         passstyle: { width: 270, fontSize: 18, borderRadius: 14, backgroundColor: 'white', top: 27, height: 45, alignSelf: 'center' }
//     });