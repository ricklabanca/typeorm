import "reflect-metadata"
import { expect } from "chai"
import { DataSource } from "../../../../src/data-source/DataSource"
import { Post } from "./entity/Post"
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils"

describe("repository > delete methods", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

    let connections: DataSource[]
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [__dirname + "/entity/*{.js,.ts}"],
            })),
    )
    beforeEach(() => reloadTestingDatabases(connections))
    after(() => closeTestingConnections(connections))

    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------

    it("remove using delete method should delete successfully", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save some new posts
                const newPost1 = postRepository.create()
                newPost1.title = "Super post #1"
                const newPost2 = postRepository.create()
                newPost2.title = "Super post #2"
                const newPost3 = postRepository.create()
                newPost3.title = "Super post #3"
                const newPost4 = postRepository.create()
                newPost4.title = "Super post #4"

                await postRepository.save(newPost1)
                await postRepository.save(newPost2)
                await postRepository.save(newPost3)
                await postRepository.save(newPost4)

                // remove one
                await postRepository.delete(1)

                // load to check
                const loadedPosts = await postRepository.find()

                // assert
                expect(loadedPosts.length).to.equal(3)
                expect(loadedPosts.find((p) => p.id === 1)).to.be.undefined
                expect(loadedPosts.find((p) => p.id === 2)).not.to.be.undefined
                expect(loadedPosts.find((p) => p.id === 3)).not.to.be.undefined
                expect(loadedPosts.find((p) => p.id === 4)).not.to.be.undefined
            }),
        ))

    it("remove multiple rows using delete method should delete successfully", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save some new posts
                const newPost1 = postRepository.create()
                newPost1.title = "Super post #1"
                const newPost2 = postRepository.create()
                newPost2.title = "Super post #2"
                const newPost3 = postRepository.create()
                newPost3.title = "Super post #3"
                const newPost4 = postRepository.create()
                newPost4.title = "Super post #4"

                await postRepository.save(newPost1)
                await postRepository.save(newPost2)
                await postRepository.save(newPost3)
                await postRepository.save(newPost4)

                // remove multiple
                await postRepository.delete([2, 3])

                // load to check
                const loadedPosts = await postRepository.find()

                // assert
                expect(loadedPosts.length).to.equal(2)
                expect(loadedPosts.find((p) => p.id === 1)).not.to.be.undefined
                expect(loadedPosts.find((p) => p.id === 2)).to.be.undefined
                expect(loadedPosts.find((p) => p.id === 3)).to.be.undefined
                expect(loadedPosts.find((p) => p.id === 4)).not.to.be.undefined
            }),
        ))

    it("remove row using delete method with partial criteria should delete successfully", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save some new posts
                const newPost1 = postRepository.create()
                newPost1.title = "Super post #1"
                const newPost2 = postRepository.create()
                newPost2.title = "Super post #2"
                const newPost3 = postRepository.create()
                newPost3.title = "Super post #3"
                const newPost4 = postRepository.create()
                newPost4.title = "Super post #4"

                await postRepository.save(newPost1)
                await postRepository.save(newPost2)
                await postRepository.save(newPost3)
                await postRepository.save(newPost4)

                // remove with criteria
                await postRepository.delete({ title: "Super post #3" })

                // load to check
                const loadedPosts = await postRepository.find()

                // assert
                expect(loadedPosts.length).to.equal(3)
                expect(loadedPosts.find((p) => p.title === "Super post #1")).not
                    .to.be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #2")).not
                    .to.be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #3")).to
                    .be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #4")).not
                    .to.be.undefined
            }),
        ))

    it("removes all rows using deleteAll method", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post)

                // save some new posts
                const newPost1 = postRepository.create()
                newPost1.title = "Super post #1"
                const newPost2 = postRepository.create()
                newPost2.title = "Super post #2"
                const newPost3 = postRepository.create()
                newPost3.title = "Super post #3"
                const newPost4 = postRepository.create()
                newPost4.title = "Super post #4"

                await postRepository.save(newPost1)
                await postRepository.save(newPost2)
                await postRepository.save(newPost3)
                await postRepository.save(newPost4)

                // remove all
                await postRepository.deleteAll()

                // load to check
                const loadedPosts = await postRepository.find()

                // assert
                expect(loadedPosts.length).to.equal(0)
                expect(loadedPosts.find((p) => p.title === "Super post #1")).to
                    .be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #2")).to
                    .be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #3")).to
                    .be.undefined
                expect(loadedPosts.find((p) => p.title === "Super post #4")).to
                    .be.undefined
            }),
        ))
})
