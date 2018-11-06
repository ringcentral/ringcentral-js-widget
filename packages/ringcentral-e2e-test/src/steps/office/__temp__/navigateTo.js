
export default class NavigateTo {
  static async go({ app, options: { isVirtual } }) {
    // TODO
    await $(app).waitFor(300);
    if (isVirtual) {
      app.props().phone.routerInteraction.push('/');
    } else {
      await $(app).execute('phone.routerInteraction.push(\'/\')');
    }
  }
  static get steps() {
    return [
      this.go,
    ];
  }
}
