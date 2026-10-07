// Other attributes, `disabled` for one, go to the naive-ui checkbox underneath and are not part of this type.
export interface HkCheckboxProps {
  /** Whether the box is ticked. Use it as v-model:checked. Default: false. */
  checked?: boolean
}

export interface HkCheckboxEmits {
  /** The person ticked or unticked the box. */
  (event: 'update:checked', checked: boolean): void
}

export interface HkCheckboxSlots {
  /** The label next to the box. */
  default?(): unknown
}
