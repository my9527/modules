import cloneDeep from 'lodash.clonedeep'
import { actorDescriptorMap } from '../data'
import { ActorName, DataType, MethodNum } from '../types'
import { describeDataType } from './generic'

/**
 * Returns a descriptor with values based on the provided actor name, method number and params
 * @param actorName the name of the actor on which the method was called
 * @param methodNum the number of the method that was called on the actor
 * @param msgParams the parameters that were passed to the method
 * @returns the described message params
 */
export const describeMessageParams = (
  actorName: ActorName,
  methodNum: MethodNum,
  msgParams: any
): DataType | null => {
  // Return null for falsy message params
  if (!msgParams) return null

  // Retrieve the message params descriptor
  const descriptor = actorDescriptorMap[actorName]?.Methods[methodNum]?.Param
  if (!descriptor)
    throw new Error(
      `Missing message params descriptor for: ${actorName}, method: ${methodNum}`
    )

  // Supplement the descriptor with parameter values
  const dataType = cloneDeep<DataType>(descriptor)
  describeDataType(dataType, msgParams)

  // Return the described params
  return dataType
}