import {
  VelocityStrategyInterface,
  PositionPropertiesInterface,
} from '@/support/interfaces';

/**
* RightBottomVelocityStrategy
* Strategy for right bottom velocity transition.
*
* @implements VelocityStrategy
*/
export default class RightBottomVelocityStrategy implements VelocityStrategyInterface {
  /**
   * Method to handle resolve strategy.
   * @param startPosition: PositionProperties
   * @param endPosition: PositionProperties
   * @param step: number
   * @param resolve: (value?: void | PromiseLike<void>) => void
   * @return { position: PositionProperties; end: boolean; }
   */
  public transition = (
    startPosition: PositionPropertiesInterface,
    endPosition: PositionPropertiesInterface,
    step: number,
    resolve: (value?: void | PromiseLike<void>) => void,
  ): {
    position: PositionPropertiesInterface;
    end: boolean;
  } => {
    const startPositionCopy = startPosition;
    if (
      startPositionCopy.x >= endPosition.x
      && startPositionCopy.y >= endPosition.y
    ) {
      resolve();
      return { position: endPosition, end: true };
    }
    startPositionCopy.x = startPositionCopy.x < endPosition.x
      ? startPositionCopy.x + step : endPosition.x;
    startPositionCopy.y = startPositionCopy.y < endPosition.y
      ? startPositionCopy.y + step : endPosition.y;

    return { position: startPositionCopy, end: false };
  }
}
