import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone';
import './jest-global-mock';

setupZoneTestEnv();

window.open = jest.fn();
