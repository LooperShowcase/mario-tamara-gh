kaboom({ global: true, scale: 2, fullscreen: true, clearColor: [1, 0, 0, 1] });
loadRoot("./sprites/");
loadSprite("princes", "princes.png");
loadSprite("mario", "mario.png");
loadSprite("evil_mushroom", "evil_mushroom.png");
loadSprite("block", "block_blue.png");
loadSprite("coin", "coin.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("surprise", "surprise.png");
loadSprite("star", "star.png ");
loadSound("jump", "jumpSound.mp3");
loadSound("gameSound", "gameSound.mp3");
loadSprite("pipe_up", "pipe_up.png");
loadSprite("heart", "heart.png");
let score = 0;
let hearts = 3;
scene("game", () => {
  play("gameSound");
  layers[("obj", "ui", "obj")], "obj";
  const map = [
    "                                                             ",
    "                                                             ",
    "                                                             ",
    "                        ==============================       ",
    "                                                        ==+==",
    "                                                             ",
    "                                                    =====  ",
    "                                                 ====       =  ",
    "                                             ===      +       ",
    "                                          ==             = =    ",
    "                                       =                               = = = = = = = = = = = = = = = = =                                                                                                                                        ",
    "                                                    = = =                                                                                                                                                                       ",
    "                        ===================                                                                                                                                                                             ",
    "                     =                       = = = = =                                                                                                                                                                      ",
    "                  =                                                                                                                                                                                               ",
    "              +                     s  = = = = = =                                                                                                                                                                           0  ",
    "  e                                                                                                                                                                                                                            ",
    "============================================================== = = = = = =  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = == = = = == = = == = == = = ==========================  = = = = = = = = = = =",
  ];

  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    p: [sprite("princes"), solid(), "princes"],
    "+": [sprite("surprise"), solid(), "surprise_coin"],
    s: [sprite("surprise"), solid(), "surprise_star"],
    $: [sprite("coin"), solid(), "coin.png", body()],
    u: [sprite("unboxed"), solid(), "unboxed"],
    "^": [sprite("star"), "star", body()],
    e: [sprite("evil_mushroom"), "evil_mushroom", body()],
    0: [sprite("pipe_up"), solid(), "pipe_up"],
  };

  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("princes"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  const scoreLabel = add([text("score:0")]);
  const heartObj = add([
    sprite("heart"),
    text("     x3", 12),
    origin("center"),
  ]);

  const moveSpeed = 150;

  keyDown("right", () => {
    player.move(moveSpeed, 0);
  });

  keyDown("left", () => {
    player.move(-moveSpeed, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_star")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("^", obj.gridPos.sub(0, 1));
    }
  });
  action("star", (obj) => {
    obj.move(20, 0);
  });

  player.collides("star", (obj) => {
    destroy(obj);
    score += 10;
  });
  player.collides("coin.png", (obj) => {
    destroy(obj);
    player.biggify(5);
  });
  action("coin.png", (obj) => {
    obj.move(20, 0);
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    heartObj.pos = player.pos.sub(400, 180);
    scoreLabel.text = "score" + score;
    heartObj.text = "    x" + hearts;

    if (player.pos.y > 500) {
      hearts--;
    }
    if (hearts <= 0) {
      go("lose");
    }
  });

  player.collides("pipe_up", (obj) => {
    keyDown("down", () => {
      go("level2");
    });
  });
  action("evil_mushroom", (obj) => {
    obj.move(70, 0);
  });
  let lastGrounded = true;
  player.collides("evil_mushroom", (obj) => {
    if (lastGrounded) {
      // go("lose");
      hearts--;
    }
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
});

//scene end
scene("lose", () => {
  hearts = 3;
  add([
    text("Game over", 64),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
  keyDown("space", () => {
    go("game");
  });
});

scene("win", () => {
  add([text("you won", 64), origin("center"), pos(width() / 2, height() / 2)]);
  keyDown("space", () => {
    go("game");
  });
});
scene("level2", () => {
  play("gameSound");
  layers[("obj", "ui", "obj")], "obj";
  const map = [
    "                                                                          0         ",
    "                                                                                      ",
    "                                                                    ============                   ",
    "                                                                                           ",
    "                                                          =                        ",
    "                                                                            ",
    "                                                      =                                ",
    "                                                                         ",
    "                        ==============================                  ",
    "                                                        ==+==             ",
    "                                                                              ",
    "                                                    =====              ",
    "                                                 ====       =  ",
    "                                             ===      +       ",
    "                                          ==             = =    ",
    "                                       =                               = = = = = = = = = = = = = = = = =                                                                                                                                        ",
    "                                                    = = =                                                                                                                                                                       ",
    "                        ===================                                                                                                                                                                             ",
    "                     =                       = = = = =                                                                                                                                                                      ",
    "                  =                                                                                                                                                            0                                   ",
    "              +                     s  = = = = = =                                                                                                                                                                             ",
    "  e                                                                                                                                                                                                                            ",
    "==========================  = = = = = = = = = = = ======  = = = = =  = = = = = = == = =  =  = = = = = = = = = ========== = =====- ====== = ========== = ======= ==== === = == =",
  ];

  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    p: [sprite("princes"), solid(), "princes"],
    "+": [sprite("surprise"), solid(), "surprise_coin"],
    s: [sprite("surprise"), solid(), "surprise_star"],
    $: [sprite("coin"), solid(), "coin.png", body()],
    u: [sprite("unboxed"), solid(), "unboxed"],
    "^": [sprite("star"), "star", body()],
    e: [sprite("evil_mushroom"), "evil_mushroom", body()],
    0: [sprite("pipe_up"), solid(), "pipe_up"],
  };

  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("princes"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  const scoreLabel = add([text("score:0")]);
  const moveSpeed = 1050;

  keyDown("right", () => {
    player.move(moveSpeed, 0);
  });

  keyDown("left", () => {
    player.move(-moveSpeed, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_star")) {
      destroy(obj);
      gameLevel.spawn("u", obj.gridPos);
      gameLevel.spawn("^", obj.gridPos.sub(0, 1));
    }
  });
  action("star", (obj) => {
    obj.move(20, 0);
  });

  player.collides("star", (obj) => {
    destroy(obj);
    score += 10;
  });
  player.collides("coin.png", (obj) => {
    destroy(obj);
    player.biggify(5);
  });
  action("coin.png", (obj) => {
    obj.move(20, 0);
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    scoreLabel.text = "score" + score;
    if (player.pos.y > 500) {
      go("lose");
    }
  });

  player.collides("pipe_up", (obj) => {
    keyDown("down", () => {
      go("win");
    });
  });
  action("evil_mushroom", (obj) => {
    obj.move(70, 0);
  });
  let lastGrounded = true;
  player.collides("evil_mushroom", (obj) => {
    if (lastGrounded) {
      go("lose");
    }
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
});

//scene end

start("game");
