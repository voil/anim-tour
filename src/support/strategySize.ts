import {
  SizeStrategyInterface,
  SizePropertiesInterface,
  SizeStrategyParamsInterface,
  ContextSizeStrategyInterface,
} from '@/support/interfaces';
import LeftTopSizeStrategy from '@/support/strategySizeTypes/leftTopSizeStrategy';
import RightTopSizeStrategy from '@/support/strategySizeTypes/rightTopSizeStrategy';
import LeftBottomSizeStrategy from '@/support/strategySizeTypes/leftBottomSizeStrategy';
import RightBottomSizeStrategy from '@/support/strategySizeTypes/rightBottomSizeStrategy';

/**
* ContextSizeStrategy
* Class to resolve size strategy.
*
* @implements ContextSizeStrategy
* @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
*/
export default class ContextSizeStrategy implements ContextSizeStrategyInterface {
  /**
   * @var SizeStrategy
   */
  private strategy: SizeStrategyInterface;

  /**
   * @var SizeStrategyParams
   */
  private strategyArray: SizeStrategyParamsInterface = {
    'left-top': new LeftTopSizeStrategy(),
    'right-top': new RightTopSizeStrategy(),
    'left-bottom': new LeftBottomSizeStrategy(),
    'right-bottom': new RightBottomSizeStrategy(),
  };

  /**
   * Method to set current strategy.
   * @param strategy: string
   */
  public setStrtegy(strategy: string): void {
    this.strategy = this.strategyArray[strategy];
  }

  /**
   * Method to handle resolve strategy.
   * @param startSize: SizeProperties
   * @param endSize: SizeProperties
   * @param step: number
   * @param resolve: (value?: void | PromiseLike<void>) => void
   * @return { size: SizeProperties; end: boolean; }
   */
  handle(
    startSize: SizePropertiesInterface,
    endSize: SizePropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): {
    size: SizePropertiesInterface;
    end: boolean;
  } {
    return this.strategy.size(
      startSize,
      endSize,
      step,
      resolve,
    );
  }
}
