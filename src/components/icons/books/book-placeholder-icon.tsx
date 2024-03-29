import React from 'react';
import { Svg } from '../../styles/svg';

interface IconProps {
    width: string;
    height: string;
}

export const BookPlaceholderIcon: React.FC<IconProps> = ({ width, height }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 263.335 263.335">
            <Svg.Path
                css={{
                    fill: 'White',
                }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M154.271,55.683c-5.928,0-10.464,1.528-13.114,4.42c-1.046,1.141-1.555,2.203-1.773,2.772v60.943
                c3.957-1.764,8.671-2.653,14.104-2.653c14.02,0,30.467,5.841,40.907,10.256V67.969c-5.251-2.59-10.328-4.816-15.112-6.632
                C169.41,57.584,161,55.683,154.271,55.683z M177.578,88.413c-7.804-5.683-16.27-7.927-25.865-7.708
                c-6.17,0.138-6.156-9.42,0-9.558c11.117-0.252,21.637,2.422,30.686,9.019C187.332,83.75,182.562,92.051,177.578,88.413z"/>
            <Svg.Path
                css={{
                    fill: 'white',
                }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M111.448,55.683c-6.73,0-15.14,1.902-25.004,5.654c-4.784,1.82-9.859,4.046-15.112,6.637v63.446
                c10.438-4.415,26.887-10.256,40.905-10.256c5.262,0,9.845,0.833,13.721,2.485V62.004c-0.287-0.543-0.723-1.213-1.358-1.911
                C121.972,57.207,117.421,55.683,111.448,55.683z M112.948,80.705c-9.596-0.215-18.06,2.03-25.865,7.708
                c-4.994,3.633-9.754-4.663-4.821-8.254c9.057-6.59,19.569-9.264,30.687-9.017C119.099,71.285,119.113,80.843,112.948,80.705z"/>
            <Svg.Path
                css={{
                    fill: 'white',
                }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M237.391,105.723C237.391,47.429,189.964,0,131.668,0C73.374,0,25.944,47.429,25.944,105.723
                c0,8.636,1.148,17.469,3.412,26.276c0.058,0.597,0.187,1.194,0.397,1.777c0.665,1.849,6.611,18.286,10.725,25.245
                c21.042,39.992,49.884,74.22,85.732,101.747c0.628,0.719,1.396,1.325,2.275,1.782c0.866,0.453,1.801,0.7,2.763,0.756
                c0.21,0.019,0.425,0.028,0.64,0.028c1.162,0,2.333-0.28,3.418-0.812c0.801-0.392,1.505-0.947,2.093-1.605
                c80.204-61.433,95.849-125.814,96.422-128.335C236.188,123.563,237.391,114.523,237.391,105.723z M213.533,65.364v74.41
                c0,6.893-5.61,12.503-12.499,12.503H64.693c-6.896,0-12.501-5.61-12.501-12.503v-75.18c0-6.896,5.61-12.501,12.501-12.501h9.014
                c14.83-6.524,27.522-9.831,37.741-9.831c10.662,0,17.347,3.565,21.41,7.245c4.06-3.685,10.752-7.245,21.413-7.245
                c10.216,0,22.906,3.307,37.738,9.831h9.017c1.951,0,3.78,0.492,5.433,1.295c4.163,2.03,7.065,6.271,7.065,11.206v0.77H213.533z"/>
        </Svg>
    );
};
