import classes from './SidebarBackgroundDecoration.module.css';

const SidebarBackgrounDecorationComponent = (): JSX.Element => {
    return (
        <div className={classes.container}>
            <div className="position-absolute" style={{backgroundColor: 'black', height: '200px', width: '50px', bottom: 0}}>
                
            </div>
        </div>
    )
}

export default SidebarBackgrounDecorationComponent;