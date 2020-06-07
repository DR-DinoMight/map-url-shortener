import styles from './dark_mode_switcher.module.scss';

class DarkModeSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let prefersDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        let darkMode =
            JSON.parse(localStorage.getItem('prefersDarkScheme')) ??
            prefersDarkScheme;
        console.log('DarkMode', darkMode);

        if (darkMode === null) {
            darkMode = prefersDarkScheme;
        }

        console.log(darkMode);

        this.setState({
            darkMode: darkMode,
        });

        document.documentElement.setAttribute(
            'data-theme',
            darkMode ? 'dark' : 'light'
        );
    }

    onChange(props) {
        let darkMode = !this.state.darkMode;
        console.log(this.state.darkMode, darkMode);

        this.setState({
            darkMode: darkMode,
        });

        document.documentElement.setAttribute(
            'data-theme',
            darkMode ? 'dark' : 'light'
        );

        console.log('setDarkMode', darkMode);
        localStorage.setItem('prefersDarkScheme', darkMode);
    }

    render() {
        return (
            <div className={styles.switcher}>
                <label className={styles.switch} htmlFor='checkbox'>
                    <input
                        type='checkbox'
                        id='checkbox'
                        onChange={this.onChange}
                        checked={this.state.darkMode}
                    />
                    <div className={styles.slider}></div>
                </label>
            </div>
        );
    }
}

export default DarkModeSwitcher;
