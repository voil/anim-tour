import {
  VelocityStrategyInterface,
  PositionPropertiesInterface,
  VelocityStrategyParamsInterface,
  ContextVelocityStrategyInterface,
} from '@/support/interfaces';
import LeftTopVelocityStrategy from '@/support/strategyVelocityTypes/leftTopVelocityStrategy';
import RightTopVelocityStrategy from '@/support/strategyVelocityTypes/rightTopVelocityStrategy';
import LeftBottomVelocityStrategy from '@/support/strategyVelocityTypes/leftBottomVelocityStrategy';
import RightBottomVelocityStrategy from '@/support/strategyVelocityTypes/rightBottomVelocityStrategy';

/**
* ContextVelocityStrategy
* Strategy for set velocity.
*
* @implements ContextVelocityStrategy
*/
export default class ContextVelocityStrategy implements ContextVelocityStrategyInterface {
  /**
   * @var VelocityStrategy
   */
  private strategy: VelocityStrategyInterface;

  /**
   * @var VelocityStrategyParams
   */
  private strategyArray: VelocityStrategyParamsInterface = {
    'left-top': new LeftTopVelocityStrategy(),
    'right-top': new RightTopVelocityStrategy(),
    'left-bottom': new LeftBottomVelocityStrategy(),
    'right-bottom': new RightBottomVelocityStrategy(),
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
   * @param startPosition: PositionProperties
   * @param endPosition: PositionProperties
   * @param step: number
   * @param resolve: (value?: void | PromiseLike<void>) => void
   * @return { position: PositionProperties; end: boolean; }
   */
  public handle(
    startPosition: PositionPropertiesInterface,
    endPosition: PositionPropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): {
    position: PositionPropertiesInterface;
    end: boolean;
  } {
    return this.strategy.transition(
      startPosition,
      endPosition,
      step,
      resolve,
    );
  }
}
