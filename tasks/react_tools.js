import {Foreman, Lint} from 'pui-react-tools';
import development from '../config/webpack/development';
import production from '../config/webpack/production';
import Assets from '../pui-react-tools/assets';

Assets.install({
  webpack: {
    development,
    production,
    integration: production
  }
});

Foreman.install();
Lint.install();
