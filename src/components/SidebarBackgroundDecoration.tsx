import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import classes from './SidebarBackgroundDecoration.module.css';

const SidebarBackgrounDecorationComponent = (): JSX.Element => {
    const darkmode = useSelector((state: RootState) => state.colorTheme.value);

    const absoluteBackground = {
        backgroundColor: darkmode ? '#001233' : '#E2EAFC',
        height: '100%', 
        width: '100%', 
        bottom: 0, 
        left: 0,
        borderRadius: '35px',
    }

    const wave = {
        height: '100%', 
        width: '100%', 
        backgroundColor: darkmode ? '#002855' : '#002855',
        clipPath: 'polygon(100% 0%, 0% 0% , 0% 65.00%, 1% 64.98%, 2% 64.93%, 3% 64.85%, 4% 64.73%, 5% 64.58%, 6% 64.39%, 7% 64.17%, 8% 63.92%, 9% 63.64%, 10% 63.33%, 11% 62.99%, 12% 62.62%, 13% 62.22%, 14% 61.79%, 15% 61.33%, 16% 60.85%, 17% 60.35%, 18% 59.82%, 19% 59.27%, 20% 58.70%, 21% 58.10%, 22% 57.49%, 23% 56.87%, 24% 56.22%, 25% 55.57%, 26% 54.90%, 27% 54.22%, 28% 53.53%, 29% 52.83%, 30% 52.13%, 31% 51.42%, 32% 50.70%, 33% 49.99%, 34% 49.28%, 35% 48.56%, 36% 47.86%, 37% 47.15%, 38% 46.45%, 39% 45.76%, 40% 45.08%, 41% 44.41%, 42% 43.76%, 43% 43.12%, 44% 42.49%, 45% 41.88%, 46% 41.29%, 47% 40.72%, 48% 40.17%, 49% 39.64%, 50% 39.13%, 51% 38.65%, 52% 38.20%, 53% 37.77%, 54% 37.37%, 55% 37.00%, 56% 36.66%, 57% 36.35%, 58% 36.07%, 59% 35.82%, 60% 35.60%, 61% 35.42%, 62% 35.27%, 63% 35.15%, 64% 35.07%, 65% 35.02%, 66% 35.00%, 67% 35.02%, 68% 35.07%, 69% 35.16%, 70% 35.27%, 71% 35.43%, 72% 35.61%, 73% 35.83%, 74% 36.08%, 75% 36.36%, 76% 36.68%, 77% 37.02%, 78% 37.39%, 79% 37.79%, 80% 38.22%, 81% 38.68%, 82% 39.16%, 83% 39.67%, 84% 40.20%, 85% 40.75%, 86% 41.32%, 87% 41.91%, 88% 42.52%, 89% 43.15%, 90% 43.79%, 91% 44.45%, 92% 45.12%, 93% 45.80%, 94% 46.49%, 95% 47.19%, 96% 47.89%, 97% 48.60%, 98% 49.31%, 99% 50.03%, 100% 50.74%)',
        opacity: darkmode ? '100%' : '50%',
        borderRadius: '35px',
    }

    return (
        <div className={classes.container}>
            <div className="position-absolute" style={absoluteBackground}>
                <div className='position-absolute' style={wave}>
                </div>
            </div> 
        </div>
    )
}

export default SidebarBackgrounDecorationComponent;