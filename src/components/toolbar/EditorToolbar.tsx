import React from 'react'
import { Quill } from 'react-quill'

const SnowTheme = Quill.import('themes/snow')

class SnowThemeFix extends SnowTheme {
  extendToolbar(toolbar: unknown) {
    super.extendToolbar(toolbar)
    this.tooltip.textbox.dataset.link = 'link를 넣어주세요.'
  }
}

Quill.register('themes/snow', SnowThemeFix, true)

export function QuillToolbar() {
  return (
    <div
      id="toolbar"
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 -translate-y toolbar-wrapper"
    >
      <span className="ql-formats">
        <select className="ql-header" defaultValue="3">
          <option value="1">Title</option>
          <option value="2">SubTitle</option>
          <option value="3">Text</option>
        </select>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-bold" aria-label="ql-bold" />
        <button type="button" className="ql-italic" aria-label="ql-italic" />
        <button
          type="button"
          className="ql-underline"
          aria-label="ql-underline"
        />
        <button type="button" className="ql-strike" aria-label="ql-strike" />
      </span>
      <span className="ql-formats">
        <button
          type="button"
          className="ql-list"
          aria-label="ql-list-ordered"
          value="ordered"
        />
        <button
          type="button"
          className="ql-list"
          aria-label="ql-list-bullet"
          value="bullet"
        />
        <select className="ql-align" aria-label="ql-align" />
      </span>
      <span className="ql-formats">
        <select className="ql-color" aria-label="ql-color">
          <option value="#000000" aria-label="ql-color-black" />
          <option value="#6b7280" aria-label="ql-color-gray" />
          <option value="#ef4444" aria-label="ql-color-red" />
          <option value="#f97316" aria-label="ql-color-orange" />
          <option value="#facc15" aria-label="ql-color-yellow" />
          <option value="#84cc16" aria-label="ql-color-green" />
          <option value="#0ea4e9" aria-label="ql-color-sky" />
          <option value="#6366f1" aria-label="ql-color-navy" />
          <option value="#8b5cf6" aria-label="ql-color-purple" />
        </select>
        <select className="ql-background" aria-label="ql-background">
          <option value="#ffffff" aria-label="ql-background-white" />
          <option value="#a7a9ac" aria-label="ql-background-gray" />
          <option value="#f77a7a" aria-label="ql-background-red" />
          <option value="#fcc288" aria-label="ql-background-orange" />
          <option value="#fcf3b1" aria-label="ql-background-yellow" />
          <option value="#c7ebc1" aria-label="ql-background-green" />
          <option value="#b8dffc" aria-label="ql-background-sky" />
          <option value="#c6cfff" aria-label="ql-background-navy" />
          <option value="#d6d2f5" aria-label="ql-background-purple" />
        </select>
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-link" aria-label="ql-link" />
      </span>
    </div>
  )
}

export default QuillToolbar
