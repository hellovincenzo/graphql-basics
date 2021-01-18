import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if (emailTaken) throw new Error('Email Taken');

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error('User not found');

    const deletedUsers = db.users.splice(userIndex, 1);

    posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers;
  },
  createPost(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error('User not found');

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    posts.push(post);

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) throw new Error('Post not found');

    const deletedPost = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => {
      const match = comment.id === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.author !== post.author);
      }
      return !match;
    });
    return deletedPost;
  },
  createComment(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error('User not found');

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    return comment;
  },
};

export { Mutation as default };