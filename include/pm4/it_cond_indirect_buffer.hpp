#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItCondIndirectBufferDef {
    static constexpr std::uint8_t opcode = 0x3f;
    static constexpr std::string_view name = "IT_COND_INDIRECT_BUFFER";
    static constexpr std::string_view desc = "Conditionally execute indirect command buffer based on predicate";
};
}
