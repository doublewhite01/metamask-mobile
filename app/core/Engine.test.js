import Engine from './Engine';
import initialState from '../util/test/initial-background-state.json';

jest.unmock('./Engine');

describe('Engine', () => {
  it('should expose an API', () => {
    const engine = Engine.init({});
    expect(engine.context).toHaveProperty('AccountTrackerController');
    expect(engine.context).toHaveProperty('AddressBookController');
    expect(engine.context).toHaveProperty('AssetsContractController');
    expect(engine.context).toHaveProperty('TokenListController');
    expect(engine.context).toHaveProperty('TokenDetectionController');
    expect(engine.context).toHaveProperty('NftDetectionController');
    expect(engine.context).toHaveProperty('NftController');
    expect(engine.context).toHaveProperty('CurrencyRateController');
    expect(engine.context).toHaveProperty('KeyringController');
    expect(engine.context).toHaveProperty('NetworkController');
    expect(engine.context).toHaveProperty('PhishingController');
    expect(engine.context).toHaveProperty('PreferencesController');
    expect(engine.context).toHaveProperty('SignatureController');
    expect(engine.context).toHaveProperty('TokenBalancesController');
    expect(engine.context).toHaveProperty('TokenRatesController');
    expect(engine.context).toHaveProperty('TokensController');
    expect(engine.context).toHaveProperty('LoggingController');
  });

  it('calling Engine.init twice returns the same instance', () => {
    const engine = Engine.init({});
    const newEngine = Engine.init({});
    expect(engine).toStrictEqual(newEngine);
  });

  it('calling Engine.destroy deletes the old instance', async () => {
    const engine = Engine.init({});
    await engine.destroyEngineInstance();
    const newEngine = Engine.init({});
    expect(engine).not.toStrictEqual(newEngine);
  });

  // Use this to keep the unit test initial background state fixture up-to-date
  it('matches initial state fixture', () => {
    const engine = Engine.init({});
    let backgroundState = engine.datamodel.state;

    // deleting lastVisited from chainStatus, since its timestamp it makes the test case fail
    const { chainId, versionInfo } =
      backgroundState.PPOMController.chainStatus['0x1'];
    backgroundState = {
      ...backgroundState,
      PPOMController: {
        ...backgroundState.PPOMController,
        chainStatus: {
          ...backgroundState.PPOMController.chainStatus,
          '0x1': {
            chainId,
            versionInfo,
          },
        },
      },
      KeyringController: {
        ...backgroundState.KeyringController,
        vault: {
          cipher: 'mock-cipher',
          iv: 'mock-iv',
          lib: 'original',
        },
      },
    };

    expect(backgroundState).toStrictEqual(initialState);
  });
});
